export async function handler(event, context) {
    try {
      const body = JSON.parse(event.body);
  
      // Verificar se as variáveis de ambiente estão definidas
      if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY) {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: "Variáveis de ambiente do EmailJS não configuradas. Verifique: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY" 
          })
        };
      }
  
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          template_params: body
        })
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
        body: JSON.stringify({ message: "Email enviado com sucesso" })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  }
  