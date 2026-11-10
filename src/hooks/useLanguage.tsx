import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'language';

export type Language = 'es' | 'en';

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre Mí',
    'nav.contact': 'Contacto',
    'lang.spanish': 'Español',
    'lang.english': 'Inglés',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.switchToLight': 'Cambiar a modo claro',
    'theme.switchToDark': 'Cambiar a modo oscuro',
    'menu.open': 'Abrir menú',
    'menu.close': 'Cerrar menú',
    'footer.role': 'Desarrollador Full-Stack',
    'footer.rights': 'Todos los derechos reservados.',
    'home.hero.available': 'Disponible para nuevos proyectos',
    'home.hero.title.start': 'Desarrollador',
    'home.hero.title.data': 'Full-Stack',
    'home.hero.title.middle': '&',
    'home.hero.title.solutions': 'IA aplicada',
    'home.hero.description':
      'Construyo APIs, datos e interfaces para productos reales. Experiencia en banca, ERP y producto sanitario con Python, Java, TypeScript y SQL; IA aplicada con criterio y fallback determinista.',

    'home.hero.viewProjects': 'Ver Proyectos',
    'home.hero.contact': 'Contactar',
    'home.about.photoAlt': 'Foto de Jose Gellida',
    'home.about.title': 'Sobre Mí',
    'home.about.description':
      'Desarrollador full-stack con experiencia en banca, ERP y producto sanitario. Actualmente curso Ciencia de Datos y mantengo OcularIA, una plataforma clínica multi-tenant. Antes: BBVA, MWConsultores y Contpaqi.',

    'home.about.experience': 'Años de experiencia',
    'home.about.roles': 'Roles profesionales',
    'home.about.more': 'Ver más',
    'home.tech.title': 'Tecnologías',
    'home.tech.subtitle': 'Mi stack tecnológico',
    'home.tech.description.start': 'Trabajo en el ',
    'home.tech.description.highlight1': 'mundo del desarrollo web',
    'home.tech.description.middle': ' con diversas tecnologías. Mi ',
    'home.tech.description.highlight2': 'experiencia',
    'home.tech.description.end': ' incluye:',
    'home.tech.category.frontend': 'Frontend',
    'home.tech.category.backend': 'Backend',
    'home.tech.category.tools': 'Herramientas',
    'home.tech.category.learning': 'Especializándome',
    'home.projects.title': 'Proyectos',
    'home.projects.subtitle': 'Una selección rápida',
    'home.projects.description': 'Explora algunos proyectos destacados y luego entra a verlos todos.',
    'home.projects.viewAll': 'Ver todos',
    'home.cta.title': '¿Trabajamos juntos?',
    'home.cta.description': 'Estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente, conversemos.',
    'home.cta.button': 'Escríbeme',
    'about.header.title': 'Sobre Mí',
    'about.header.subtitle': 'Conoce más sobre mi trayectoria y experiencia profesional',
    'about.story.title': 'Mi Historia',
    'about.story.who': '¿Quién soy?',

    'about.experience.title': 'Experiencia',
    'about.education.title': 'Formación',
    'about.courses': 'Asignaturas clave',
    'about.skills.title': 'Skills',

    'contact.header.title': 'Contacto',
    'contact.header.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
    'contact.section.title': 'Ponte en Contacto',
    'contact.info.title': 'Información de Contacto',
    'contact.info.phone': 'Teléfono',
    'contact.form.title': 'Envíame un Mensaje',
    'contact.form.success': '¡Mensaje enviado correctamente! Te responderé pronto.',
    'contact.form.name': 'Nombre *',
    'contact.form.email': 'Email *',
    'contact.form.mobile': 'Móvil *',
    'contact.form.message': 'Mensaje *',
    'contact.form.placeholder.name': 'Tu nombre',
    'contact.form.placeholder.email': 'tu@email.com',
    'contact.form.placeholder.mobile': 'tu móvil',
    'contact.form.placeholder.message': 'Cuéntame sobre tu proyecto...',
    'contact.form.button.send': 'Enviar Mensaje',
    'contact.form.button.sending': 'Enviando...',
    'contact.form.error.config': 'El formulario no está configurado. Define VITE_WEB3FORMS_ACCESS_KEY antes de desplegar.',
    'contact.form.error.required': 'Por favor completa todos los campos',
    'contact.form.error.submit': 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    'contact.form.error.api': 'Error al enviar el mensaje',
    'contact.form.subject': 'Nuevo mensaje de {{name}} desde Portfolio',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'lang.spanish': 'Spanish',
    'lang.english': 'English',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.switchToLight': 'Switch to light mode',
    'theme.switchToDark': 'Switch to dark mode',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'footer.role': 'Full-Stack Developer',
    'footer.rights': 'All rights reserved.',
    'home.hero.available': 'Available for new projects',
    'home.hero.title.start': 'Full-Stack',
    'home.hero.title.data': 'Developer',
    'home.hero.title.middle': '&',
    'home.hero.title.solutions': 'Applied AI',
    'home.hero.description':
      'I build APIs, data and interfaces for real products. Experience across banking, ERP and healthcare with Python, Java, TypeScript and SQL; applied AI with judgement and deterministic fallbacks.',

    'home.hero.viewProjects': 'View Projects',
    'home.hero.contact': 'Contact',
    'home.about.photoAlt': 'Photo of Jose Gellida',
    'home.about.title': 'About Me',
    'home.about.description':
      'Full-stack developer with experience in banking, ERP and healthcare. I am currently studying Data Science and maintain OcularIA, a multi-tenant clinical platform. Previously: BBVA, MWConsultores and Contpaqi.',

    'home.about.experience': 'Years of experience',
    'home.about.roles': 'Professional roles',
    'home.about.more': 'See more',
    'home.tech.title': 'Technologies',
    'home.tech.subtitle': 'My tech stack',
    'home.tech.description.start': 'I work in the ',
    'home.tech.description.highlight1': 'web development world',
    'home.tech.description.middle': ' with different technologies. My ',
    'home.tech.description.highlight2': 'experience',
    'home.tech.description.end': ' includes:',
    'home.tech.category.frontend': 'Frontend',
    'home.tech.category.backend': 'Backend',
    'home.tech.category.tools': 'Tools',
    'home.tech.category.learning': 'Specializing',
    'home.projects.title': 'Projects',
    'home.projects.subtitle': 'A quick selection',
    'home.projects.description': 'Explore some featured projects and then dive into all of them.',
    'home.projects.viewAll': 'View all',
    'home.cta.title': 'Shall we work together?',
    'home.cta.description': 'I am open to new opportunities. If you have a project in mind, let us talk.',
    'home.cta.button': 'Message me',
    'about.header.title': 'About Me',
    'about.header.subtitle': 'Learn more about my journey and professional experience',
    'about.story.title': 'My Story',
    'about.story.who': 'Who am I?',

    'about.experience.title': 'Experience',
    'about.education.title': 'Education',
    'about.courses': 'Key courses',
    'about.skills.title': 'Skills',

    'contact.header.title': 'Contact',
    'contact.header.subtitle': 'Do you have a project in mind? Let us talk!',
    'contact.section.title': 'Get in Touch',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.form.title': 'Send me a Message',
    'contact.form.success': 'Message sent successfully! I will get back to you soon.',
    'contact.form.name': 'Name *',
    'contact.form.email': 'Email *',
    'contact.form.mobile': 'Mobile *',
    'contact.form.message': 'Message *',
    'contact.form.placeholder.name': 'Your name',
    'contact.form.placeholder.email': 'you@email.com',
    'contact.form.placeholder.mobile': 'your mobile',
    'contact.form.placeholder.message': 'Tell me about your project...',
    'contact.form.button.send': 'Send Message',
    'contact.form.button.sending': 'Sending...',
    'contact.form.error.config': 'The form is not configured. Define VITE_WEB3FORMS_ACCESS_KEY before deploying.',
    'contact.form.error.required': 'Please complete all fields',
    'contact.form.error.submit': 'Error sending the message. Please try again.',
    'contact.form.error.api': 'Error sending message',
    'contact.form.subject': 'New message from {{name}} from Portfolio',
  },
} as const;

type TranslationKey = keyof (typeof translations)['es'];

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'es';

  try {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }
  } catch {
    // ignore
  }

  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[language][key];
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
