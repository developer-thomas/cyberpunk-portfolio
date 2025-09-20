export async function handler(event, context) {
  try {
    const publicKey = 'gmxYSvVDj8H7pB-9_';
    
    // Teste simples para verificar se a chave pública está no formato correto
    const testData = {
      service_id: 'test',
      template_id: 'test', 
      publicKey: publicKey,
      template_params: { test: 'test' }
    };

    console.log('Testando chave pública:', publicKey);
    console.log('Dados de teste:', JSON.stringify(testData, null, 2));

    // Fazer uma requisição de teste para o EmailJS
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    });

    const responseText = await response.text();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Teste de chave pública",
        publicKey: publicKey,
        responseStatus: response.status,
        responseText: responseText
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        publicKey: 'gmxYSvVDj8H7pB-9_'
      })
    };
  }
}
