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

type TranslationKey =
  | 'nav.home'
  | 'nav.projects'
  | 'nav.challenges'
  | 'nav.visualThinking'
  | 'nav.about'
  | 'nav.contact'
  | 'lang.spanish'
  | 'lang.english'
  | 'theme.light'
  | 'theme.dark'
  | 'theme.switchToLight'
  | 'theme.switchToDark'
  | 'menu.open'
  | 'menu.close'
  | 'footer.role'
  | 'footer.rights'
  | 'home.hero.available'
  | 'home.hero.title.start'
  | 'home.hero.title.data'
  | 'home.hero.title.middle'
  | 'home.hero.title.solutions'
  | 'home.hero.description'
  | 'home.hero.viewProjects'
  | 'home.hero.contact'
  | 'home.about.photoAlt'
  | 'home.about.title'
  | 'home.about.description'
  | 'home.about.experience'
  | 'home.about.completedProjects'
  | 'home.about.more'
  | 'home.tech.title'
  | 'home.tech.subtitle'
  | 'home.tech.description.start'
  | 'home.tech.description.highlight1'
  | 'home.tech.description.middle'
  | 'home.tech.description.highlight2'
  | 'home.tech.description.end'
  | 'home.tech.category.frontend'
  | 'home.tech.category.backend'
  | 'home.tech.category.tools'
  | 'home.tech.category.learning'
  | 'home.projects.title'
  | 'home.projects.subtitle'
  | 'home.projects.description'
  | 'home.projects.viewAll'
  | 'home.challenges.subtitle'
  | 'home.challenges.viewAll'
  | 'home.cta.title'
  | 'home.cta.description'
  | 'home.cta.button'
  | 'about.header.title'
  | 'about.header.subtitle'
  | 'about.story.title'
  | 'about.story.who'
  | 'about.story.p1'
  | 'about.story.p2'
  | 'about.story.p3'
  | 'about.experience.title'
  | 'about.experience.role1'
  | 'about.experience.company1'
  | 'about.experience.desc1'
  | 'about.experience.role2'
  | 'about.experience.company2'
  | 'about.experience.desc2'
  | 'about.skills.title'
  | 'about.skills.frontend'
  | 'about.skills.backend'
  | 'about.skills.devops'
  | 'about.skills.frontend.item1'
  | 'about.skills.frontend.item2'
  | 'about.skills.frontend.item3'
  | 'about.skills.frontend.item4'
  | 'about.skills.backend.item1'
  | 'about.skills.backend.item2'
  | 'about.skills.backend.item3'
  | 'about.skills.backend.item4'
  | 'about.skills.devops.item1'
  | 'about.skills.devops.item2'
  | 'about.skills.devops.item3'
  | 'about.skills.devops.item4'
  | 'contact.header.title'
  | 'contact.header.subtitle'
  | 'contact.section.title'
  | 'contact.info.title'
  | 'contact.info.phone'
  | 'contact.form.title'
  | 'contact.form.success'
  | 'contact.form.name'
  | 'contact.form.email'
  | 'contact.form.mobile'
  | 'contact.form.message'
  | 'contact.form.placeholder.name'
  | 'contact.form.placeholder.email'
  | 'contact.form.placeholder.mobile'
  | 'contact.form.placeholder.message'
  | 'contact.form.button.send'
  | 'contact.form.button.sending'
  | 'contact.form.error.config'
  | 'contact.form.error.required'
  | 'contact.form.error.submit'
  | 'contact.form.error.api'
  | 'contact.form.subject';

const translations: Record<Language, Record<TranslationKey, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.challenges': 'Desafíos',
    'nav.visualThinking': 'Visuales',
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
    'footer.role': 'Programador Fullstack',
    'footer.rights': 'Todos los derechos reservados.',
    'home.hero.available': 'Disponible para nuevos proyectos',
    'home.hero.title.start': 'Transformando',
    'home.hero.title.data': 'Datos',
    'home.hero.title.middle': 'en decisiones y código en',
    'home.hero.title.solutions': 'Soluciones',
    'home.hero.description':
      'Soy un Desarrollador Fullstack apasionado por construir aplicaciones escalables, con foco en buenas prácticas, rendimiento y una UI moderna.',
    'home.hero.viewProjects': 'Ver Proyectos',
    'home.hero.contact': 'Contactar',
    'home.about.photoAlt': 'Foto de Jose Gellida',
    'home.about.title': 'Sobre Mí',
    'home.about.description':
      'Soy un desarrollador fullstack enfocado en construir productos web modernos. Me gusta trabajar de punta a punta: desde UI con React/TypeScript hasta APIs y bases de datos.',
    'home.about.experience': 'Años de experiencia',
    'home.about.completedProjects': 'Proyectos completados',
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
    'home.tech.category.learning': 'Aprendiendo',
    'home.projects.title': 'Proyectos',
    'home.projects.subtitle': 'Una selección rápida',
    'home.projects.description': 'Explora algunos proyectos destacados y luego entra a verlos todos.',
    'home.projects.viewAll': 'Ver todos',
    'home.challenges.subtitle': 'Certificaciones y desafíos',
    'home.challenges.viewAll': 'Ver todo',
    'home.cta.title': '¿Trabajamos juntos?',
    'home.cta.description': 'Estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente, conversemos.',
    'home.cta.button': 'Escríbeme',
    'about.header.title': 'Sobre Mí',
    'about.header.subtitle': 'Conoce más sobre mi trayectoria y experiencia profesional',
    'about.story.title': 'Mi Historia',
    'about.story.who': '¿Quién soy?',
    'about.story.p1':
      'Soy un programador multiplataforma apasionado por crear soluciones tecnológicas innovadoras. Mi experiencia abarca desde el desarrollo frontend con React y TypeScript, hasta backend con Node.js y Python.',
    'about.story.p2':
      'Me especializo en crear aplicaciones web modernas, eficientes y escalables, siempre buscando las mejores prácticas y tecnologías más actuales.',
    'about.story.p3':
      'Constantemente me desafío a mí mismo aprendiendo nuevas tecnologías y participando en proyectos que expanden mis habilidades.',
    'about.experience.title': 'Experiencia',
    'about.experience.role1': 'Desarrollador Full Stack',
    'about.experience.company1': 'Empresa Tech • 2023 - Presente',
    'about.experience.desc1': 'Desarrollo de aplicaciones web con React, Node.js y PostgreSQL',
    'about.experience.role2': 'Desarrollador Frontend',
    'about.experience.company2': 'Startup Digital • 2022 - 2023',
    'about.experience.desc2': 'Creación de interfaces modernas con React y TailwindCSS',
    'about.skills.title': 'Skills',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.devops': 'DevOps y Herramientas',
    'about.skills.frontend.item1': 'React y TypeScript',
    'about.skills.frontend.item2': 'TailwindCSS y SASS',
    'about.skills.frontend.item3': 'Next.js y Vite',
    'about.skills.frontend.item4': 'Diseño Responsive',
    'about.skills.backend.item1': 'Node.js y Express',
    'about.skills.backend.item2': 'Python y FastAPI',
    'about.skills.backend.item3': 'PostgreSQL y MongoDB',
    'about.skills.backend.item4': 'APIs REST',
    'about.skills.devops.item1': 'Git y GitHub',
    'about.skills.devops.item2': 'AWS y Azure',
    'about.skills.devops.item3': 'Docker',
    'about.skills.devops.item4': 'CI/CD',
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
    'nav.challenges': 'Challenges',
    'nav.visualThinking': 'Visual Thinking',
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
    'footer.role': 'Fullstack Developer',
    'footer.rights': 'All rights reserved.',
    'home.hero.available': 'Available for new projects',
    'home.hero.title.start': 'Transforming',
    'home.hero.title.data': 'Data',
    'home.hero.title.middle': 'into decisions and code into',
    'home.hero.title.solutions': 'Solutions',
    'home.hero.description':
      'I am a Fullstack Developer passionate about building scalable applications, focused on best practices, performance, and modern UI.',
    'home.hero.viewProjects': 'View Projects',
    'home.hero.contact': 'Contact',
    'home.about.photoAlt': 'Photo of Jose Gellida',
    'home.about.title': 'About Me',
    'home.about.description':
      'I am a fullstack developer focused on building modern web products. I enjoy working end to end: from UI with React/TypeScript to APIs and databases.',
    'home.about.experience': 'Years of experience',
    'home.about.completedProjects': 'Completed projects',
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
    'home.tech.category.learning': 'Learning',
    'home.projects.title': 'Projects',
    'home.projects.subtitle': 'A quick selection',
    'home.projects.description': 'Explore some featured projects and then dive into all of them.',
    'home.projects.viewAll': 'View all',
    'home.challenges.subtitle': 'Certifications and challenges',
    'home.challenges.viewAll': 'View all',
    'home.cta.title': 'Shall we work together?',
    'home.cta.description': 'I am open to new opportunities. If you have a project in mind, let us talk.',
    'home.cta.button': 'Message me',
    'about.header.title': 'About Me',
    'about.header.subtitle': 'Learn more about my journey and professional experience',
    'about.story.title': 'My Story',
    'about.story.who': 'Who am I?',
    'about.story.p1':
      'I am a cross-platform developer passionate about creating innovative technology solutions. My experience ranges from frontend development with React and TypeScript to backend with Node.js and Python.',
    'about.story.p2':
      'I specialize in building modern, efficient, and scalable web applications, always looking for best practices and up-to-date technologies.',
    'about.story.p3':
      'I constantly challenge myself by learning new technologies and participating in projects that expand my skills.',
    'about.experience.title': 'Experience',
    'about.experience.role1': 'Full Stack Developer',
    'about.experience.company1': 'Tech Company • 2023 - Present',
    'about.experience.desc1': 'Web application development with React, Node.js, and PostgreSQL',
    'about.experience.role2': 'Frontend Developer',
    'about.experience.company2': 'Digital Startup • 2022 - 2023',
    'about.experience.desc2': 'Modern interface creation with React and TailwindCSS',
    'about.skills.title': 'Skills',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.devops': 'DevOps and Tools',
    'about.skills.frontend.item1': 'React and TypeScript',
    'about.skills.frontend.item2': 'TailwindCSS and SASS',
    'about.skills.frontend.item3': 'Next.js and Vite',
    'about.skills.frontend.item4': 'Responsive Design',
    'about.skills.backend.item1': 'Node.js and Express',
    'about.skills.backend.item2': 'Python and FastAPI',
    'about.skills.backend.item3': 'PostgreSQL and MongoDB',
    'about.skills.backend.item4': 'REST APIs',
    'about.skills.devops.item1': 'Git and GitHub',
    'about.skills.devops.item2': 'AWS and Azure',
    'about.skills.devops.item3': 'Docker',
    'about.skills.devops.item4': 'CI/CD',
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
};

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
