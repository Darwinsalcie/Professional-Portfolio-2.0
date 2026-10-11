import type { Localized, SiteMeta } from '@/types/content'

// TODO(content): Replace placeholder profile details with owner verified info
export const siteContent: Localized<SiteMeta> = {
  es: {
    // TODO(content): Owner name
    name: 'Darwin Developer',
    // TODO(content): Owner professional title
    role: 'Desarrollador Full-Stack (React + .NET)',
    // TODO(content): Production site URL
    url: 'https://example.com',
    // TODO(content): Verified contact email
    email: 'contacto@example.com',
    // TODO(content): Owner location
    location: 'Medellín, Colombia',
    // TODO(content): Owner timezone
    timezone: 'America/Bogota',
    // TODO(content): Availability status
    availability: 'Disponible para proyectos freelance y roles selectos',
    socials: {
      // TODO(content): Owner GitHub profile URL
      github: 'https://github.com/example',
      // TODO(content): Owner LinkedIn profile URL
      linkedin: 'https://linkedin.com/in/example',
      // TODO(content): Owner WhatsApp link
      whatsapp: 'https://wa.me/1234567890',
    },
  },
  en: {
    // TODO(content): Owner name
    name: 'Darwin Developer',
    // TODO(content): Owner professional title
    role: 'Full-Stack Developer (React + .NET)',
    // TODO(content): Production site URL
    url: 'https://example.com',
    // TODO(content): Verified contact email
    email: 'contact@example.com',
    // TODO(content): Owner location
    location: 'Medellin, Colombia',
    // TODO(content): Owner timezone
    timezone: 'America/Bogota',
    // TODO(content): Availability status
    availability: 'Available for freelance and select engineering roles',
    socials: {
      // TODO(content): Owner GitHub profile URL
      github: 'https://github.com/example',
      // TODO(content): Owner LinkedIn profile URL
      linkedin: 'https://linkedin.com/in/example',
      // TODO(content): Owner WhatsApp link
      whatsapp: 'https://wa.me/1234567890',
    },
  },
}
