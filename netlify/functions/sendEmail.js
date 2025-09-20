export async function handler(event, context) {
    try {
      const body = JSON.parse(event.body);
  
      // Log das variáveis de ambiente para debug (remover em produção)
      console.log('Variáveis de ambiente disponíveis:');
      console.log('EMAILJS_SERVICE_ID:', process.env.EMAILJS_SERVICE_ID ? 'DEFINIDA' : 'NÃO DEFINIDA');
      console.log('EMAILJS_TEMPLATE_ID:', process.env.EMAILJS_TEMPLATE_ID ? 'DEFINIDA' : 'NÃO DEFINIDA');
      console.log('EMAILJS_PUBLIC_KEY:', process.env.EMAILJS_PUBLIC_KEY ? 'DEFINIDA' : 'NÃO DEFINIDA');
  
      // Verificar se as variáveis de ambiente estão definidas
      const missingVars = [];
      if (!process.env.EMAILJS_SERVICE_ID) missingVars.push('EMAILJS_SERVICE_ID');
      if (!process.env.EMAILJS_TEMPLATE_ID) missingVars.push('EMAILJS_TEMPLATE_ID');
      if (!process.env.EMAILJS_PUBLIC_KEY) missingVars.push('EMAILJS_PUBLIC_KEY');
  
      if (missingVars.length > 0) {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: `Variáveis de ambiente não configuradas: ${missingVars.join(', ')}. Configure-as no dashboard do Netlify.` 
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
  