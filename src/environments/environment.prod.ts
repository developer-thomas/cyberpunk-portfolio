export const environment = {
    // production: true,
    // emailJsServiceId: 'service_eq2khhz',
    // emailJsTemplateId: 'template_qmhpynp',
    // emailJsAutoReplyTemplateId: 'template_9xmkj07',
    // emailJsPublicKey: 'gmxYSvVDj8H7pB-9_'
    production: true,
    emailJsServiceId: process.env['NG_APP_EMAILJS_SERVICE_ID'],
    emailJsTemplateId: process.env['NG_APP_EMAILJS_TEMPLATE_ID'],
    emailJsAutoReplyTemplateId: process.env['NG_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID'],
    emailJsPublicKey: process.env['NG_APP_EMAILJS_PUBLIC_KEY']
  };
  