export async function handler(event, context) {
    try {
      const body = JSON.parse(event.body);

      const publicKey = 'gmxYSvVDj8H7pB-9_';

      if (!publicKey || publicKey.trim() === '') {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: "Chave pública do EmailJS não está definida" 
          })
        };
      }
 
      const missingVars = [];
      if (!process.env.EMAILJS_SERVICE_ID) missingVars.push('EMAILJS_SERVICE_ID');
      if (!process.env.EMAILJS_TEMPLATE_ID) missingVars.push('EMAILJS_TEMPLATE_ID');
  
      if (missingVars.length > 0) {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: `Variáveis de ambiente não configuradas: ${missingVars.join(', ')}. Configure-as no dashboard do Netlify.` 
          })
        };
      }
  
      const emailData = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: publicKey,
        template_params: body
      };

      console.log('Dados sendo enviados para EmailJS:', JSON.stringify(emailData, null, 2));

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
        body: JSON.stringify({ message: "Email enviado com sucesso" })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  }
  