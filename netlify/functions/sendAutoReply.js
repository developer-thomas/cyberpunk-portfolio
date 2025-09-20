export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    
    // Chave pública hardcoded (pode ficar no código)
    const publicKey = 'gmxYSvVDj8H7pB-9_';
    
    // Verificar se a chave pública está definida
    if (!publicKey || publicKey.trim() === '') {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Chave pública do EmailJS não está definida" 
        })
      };
    }
    
    // Verificar se a variável de ambiente está definida
    if (!process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Variável de ambiente EMAILJS_AUTOREPLY_TEMPLATE_ID não configurada" 
        })
      };
    }
    
    // Verificar se os dados necessários foram enviados
    if (!body.to_name || !body.to_email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Dados obrigatórios não fornecidos: to_name e to_email são necessários" 
        })
      };
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
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Auto-reply enviado com sucesso" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
