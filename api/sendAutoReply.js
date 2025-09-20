export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Chave pública hardcoded (pode ficar no código)
    const publicKey = 'gmxYSvVDj8H7pB-9_';

    // Verificar se a chave pública está definida
    if (!publicKey || publicKey.trim() === '') {
      return res.status(500).json({
        error: "Chave pública do EmailJS não está definida"
      });
    }

    // Verificar se a variável de ambiente está definida
    if (!process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID) {
      return res.status(500).json({
        error: "Variável de ambiente EMAILJS_AUTOREPLY_TEMPLATE_ID não configurada"
      });
    }

    // Verificar se os dados necessários foram enviados
    if (!body.to_name || !body.to_email) {
      return res.status(400).json({
        error: "Dados obrigatórios não fornecidos: to_name e to_email são necessários"
      });
    }

    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID,
      user_id: publicKey,
      template_params: {
        to_name: body.to_name,
        to_email: body.to_email
      }
    };

    console.log('Enviando auto-reply:', JSON.stringify(emailData, null, 2));

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    return res.status(200).json({ message: "Auto-reply enviado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
