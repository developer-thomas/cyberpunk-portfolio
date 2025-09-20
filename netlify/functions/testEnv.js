export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Teste de variáveis de ambiente",
      env_vars: {
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID ? 'DEFINIDA' : 'NÃO DEFINIDA',
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID ? 'DEFINIDA' : 'NÃO DEFINIDA',
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? 'DEFINIDA' : 'NÃO DEFINIDA'
      }
    })
  };
}
