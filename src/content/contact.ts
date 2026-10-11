import type { ContactContent, Localized } from '@/types/content'

// TODO(content): Verify contact email and direct messaging links
export const contactContent: Localized<ContactContent> = {
  es: {
    // TODO(content): Contact section eyebrow
    eyebrow: 'Iniciemos un Proyecto',
    heading: 'Hablemos sobre tu próxima aplicación o sitio web.',
    lede: 'Ya sea que necesites una landing page de alta conversión, una aplicación web a medida o una consultoría técnica, escríbeme.',
    formLabels: {
      name: 'Nombre o Empresa',
      email: 'Correo Electrónico',
      message: 'Detalles del Proyecto',
      submit: 'Enviar Mensaje',
      submitting: 'Enviando mensaje...',
      successMessage: 'Mensaje recibido con éxito. Responderé dentro de 24 horas.',
      errorMessage: 'Ocurrió un error al enviar el mensaje. Por favor intenta por correo directo.',
    },
    directLinks: [
      {
        label: 'contacto@example.com',
        url: 'mailto:contacto@example.com',
        type: 'email',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example',
        type: 'github',
      },
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/example',
        type: 'linkedin',
      },
      {
        label: 'WhatsApp',
        url: 'https://wa.me/1234567890',
        type: 'whatsapp',
      },
    ],
  },
  en: {
    // TODO(content): Contact section eyebrow
    eyebrow: 'Start a Project',
    heading: "Let's build your next web application or landing page.",
    lede: 'Whether you need a high-converting landing page, custom business application, or architecture consultation, reach out below.',
    formLabels: {
      name: 'Name or Company',
      email: 'Email Address',
      message: 'Project Details',
      submit: 'Send Inquiry',
      submitting: 'Sending inquiry...',
      successMessage: 'Inquiry received. I will reply within 24 hours.',
      errorMessage: 'Failed to send message. Please reach out via direct email instead.',
    },
    directLinks: [
      {
        label: 'contact@example.com',
        url: 'mailto:contact@example.com',
        type: 'email',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example',
        type: 'github',
      },
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/example',
        type: 'linkedin',
      },
      {
        label: 'WhatsApp',
        url: 'https://wa.me/1234567890',
        type: 'whatsapp',
      },
    ],
  },
}
