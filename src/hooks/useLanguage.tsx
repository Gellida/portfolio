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
    'home.hero.title.start': 'Ingeniero de Software',
    'home.hero.title.data': 'orientado a IA',
    'home.hero.title.middle': '& especialista en',
    'home.hero.title.solutions': 'Automatización y Datos',
    'home.hero.description':
      'Diseño arquitecturas que integran análisis de datos e Inteligencia Artificial para optimizar procesos a gran escala. Fullstack (Java · Kotlin · JS) con enfoque en backend robusto, cloud y agentes de IA aplicados.',

    'home.hero.viewProjects': 'Ver Proyectos',
    'home.hero.contact': 'Contactar',
    'home.about.photoAlt': 'Foto de Jose Gellida',
    'home.about.title': 'Sobre Mí',
    'home.about.description':
      'Ingeniero de Software especializado en la intersección del desarrollo Fullstack y la Ciencia de Datos. Combino backend robusto en Java/Kotlin con soluciones de IA y automatización para resolver problemas complejos a gran escala.',

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
    'home.tech.category.learning': 'Especializándome',
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
      'Ingeniero de Software especializado en la intersección del desarrollo Fullstack (Java/Kotlin/JS) y la Ciencia de Datos. Actualmente cursando estudios avanzados en Ciencia de Datos en la Universidad Europea de Madrid para potenciar la toma de decisiones basada en datos y el entrenamiento de modelos aplicados.',
    'about.story.p2':
      'Mi trayectoria combina la robustez de soluciones móviles y web con el uso de Agentes de IA para resolver problemas complejos a gran escala, transformando la experiencia del usuario mediante la automatización inteligente de flujos de trabajo críticos.',
    'about.story.p3':
      'Certificado como AWS Developer (Experis, Madrid), con experiencia real en microservicios, APIs REST, Firebase, PostgreSQL, DynamoDB y pipelines CI/CD. Bilingüe: castellano nativo e inglés avanzado.',

    'about.experience.title': 'Experiencia',
    'about.experience.role1': 'Especialista Soluciones Digitales',
    'about.experience.company1': 'BBVA • Mayo 2025 - Actual',
    'about.experience.desc1': 'Testeo y validación de sistemas de automatización con IA para optimizar la gestión de incidencias en entornos bancarios de gran escala. Diseño de flujos automatizados con procesamiento de lenguaje natural.',
    'about.experience.role2': 'Ingeniero de Software I+D+i (Agentes de IA)',
    'about.experience.company2': 'Proyecto CSIC/UAM • Ene 2024 – Abr 2025',
    'about.experience.desc2': 'Arquitectura y desarrollo de agentes de IA para investigación lingüística y pedagógica. Stack: Next.js, React, Firebase y modelos de lenguaje. Aplicación de Clean Code y MVVM.',

    'about.skills.title': 'Skills',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.devops': 'DevOps y Herramientas',
    'about.skills.frontend.item1': 'React y TypeScript',
    'about.skills.frontend.item2': 'TailwindCSS y SASS',
    'about.skills.frontend.item3': 'Next.js y Vite',
    'about.skills.frontend.item4': 'Diseño Responsive',
    'about.skills.backend.item1': 'Java (Spring Boot) y Node.js',
    'about.skills.backend.item2': 'Python, FastAPI y Agentes de IA',
    'about.skills.backend.item3': 'PostgreSQL, MongoDB, DynamoDB',
    'about.skills.backend.item4': 'Microservicios y APIs REST',

    'about.skills.devops.item1': 'AWS (EC2, S3, Lambda, IAM)',
    'about.skills.devops.item2': 'Docker y Kubernetes',
    'about.skills.devops.item3': 'Firebase (Cloud Functions)',
    'about.skills.devops.item4': 'CI/CD y Git',

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
    'home.hero.title.start': 'AI-Driven',
    'home.hero.title.data': 'Software Engineer',
    'home.hero.title.middle': '| Specialist in',
    'home.hero.title.solutions': 'Automation & Data',
    'home.hero.description':
      'I design architectures that integrate data analysis and Artificial Intelligence to optimize processes at scale. Fullstack (Java · Kotlin · JS) with a focus on robust backend, cloud infrastructure and applied AI agents.',

    'home.hero.viewProjects': 'View Projects',
    'home.hero.contact': 'Contact',
    'home.about.photoAlt': 'Photo of Jose Gellida',
    'home.about.title': 'About Me',
    'home.about.description':
      'Software Engineer specialized at the intersection of Fullstack development and Data Science. I combine robust Java/Kotlin backend with AI solutions and automation to solve complex problems at scale.',

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
    'home.tech.category.learning': 'Specializing',
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
      'Software Engineer specialized at the intersection of Fullstack development (Java/Kotlin/JS) and Data Science. Currently pursuing advanced studies in Data Science at Universidad Europea de Madrid to leverage data-driven decision making and applied model training.',
    'about.story.p2':
      'My track record combines the robustness of mobile and web solutions with the use of AI Agents to solve complex problems at scale, transforming user experience through intelligent automation of critical workflows.',
    'about.story.p3':
      'AWS Developer Certified (Experis, Madrid). Experienced with microservices, REST APIs, Firebase, PostgreSQL, DynamoDB and CI/CD pipelines. Bilingual: native Spanish and advanced English.',

    'about.experience.title': 'Experience',
    'about.experience.role1': 'Digital Solutions Specialist',
    'about.experience.company1': 'BBVA • May 2025 – Present',
    'about.experience.desc1': 'Testing and validation of AI automation systems to optimize incident management in large-scale banking environments. Design of automated workflows with natural language processing.',
    'about.experience.role2': 'R&D Software Engineer (AI Agents)',
    'about.experience.company2': 'CSIC/UAM Project • Jan 2024 – Apr 2025',
    'about.experience.desc2': 'Architecture and development of AI agents for linguistic and pedagogical research. Stack: Next.js, React, Firebase and language models. Applied Clean Code and MVVM.',

    'about.skills.title': 'Skills',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.devops': 'DevOps and Tools',
    'about.skills.frontend.item1': 'React and TypeScript',
    'about.skills.frontend.item2': 'TailwindCSS and SASS',
    'about.skills.frontend.item3': 'Next.js and Vite',
    'about.skills.frontend.item4': 'Responsive Design',
    'about.skills.backend.item1': 'Java (Spring Boot) and Node.js',
    'about.skills.backend.item2': 'Python, FastAPI and AI Agents',
    'about.skills.backend.item3': 'PostgreSQL, MongoDB, DynamoDB',
    'about.skills.backend.item4': 'Microservices and REST APIs',

    'about.skills.devops.item1': 'AWS (EC2, S3, Lambda, IAM)',
    'about.skills.devops.item2': 'Docker and Kubernetes',
    'about.skills.devops.item3': 'Firebase (Cloud Functions)',
    'about.skills.devops.item4': 'CI/CD and Git',

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
