import type { Localized, NavItem } from '@/types/content'

export const navContent: Localized<NavItem[]> = {
  es: [
    { id: 'work', label: 'Proyectos', href: '#work' },
    { id: 'services', label: 'Servicios', href: '#services' },
    { id: 'stack', label: 'Tecnologías', href: '#stack' },
    { id: 'about', label: 'Sobre mí', href: '#about' },
    { id: 'contact', label: 'Contacto', href: '#contact' },
  ],
  en: [
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'stack', label: 'Stack', href: '#stack' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
}
