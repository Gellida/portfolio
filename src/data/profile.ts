export interface Localized {
  es: string;
  en: string;
}

export const profile = {
  name: 'José Gellida',
  role: {
    es: 'Desarrollador Full-Stack · IA aplicada',
    en: 'Full-Stack Developer · Applied AI',
  } as Localized,
  location: {
    es: 'Madrid, España',
    en: 'Madrid, Spain',
  } as Localized,
  workPermit: {
    es: 'Permiso de trabajo activo en España',
    en: 'Full work permit in Spain',
  } as Localized,
  availability: {
    es: 'Disponible para nuevos proyectos',
    en: 'Available for new projects',
  } as Localized,
  email: 'gellida.dev@gmail.com',
  phone: '+34 692073771',
  github: 'https://github.com/gellida',
  linkedin: 'https://linkedin.com/in/jose-gellida',
  site: 'https://www.josegellida.com',
};

export const projectsCount = 3;

export interface EducationEntry {
  id: string;
  degree: Localized;
  institution: string;
  location: Localized;
  /** Formato YYYY-MM o YYYY si no hay mes. */
  start: string;
  /** null = en curso. */
  end: string | null;
  courses?: { es: string[]; en: string[] };
}

export const education: EducationEntry[] = [
  {
    id: 'universidad-europea',
    degree: {
      es: 'Grado en Ciencia de Datos',
      en: 'BSc in Data Science',
    },
    institution: 'Universidad Europea',
    location: {
      es: 'Madrid, España',
      en: 'Madrid, Spain',
    },
    start: '2026-02',
    end: null,
    courses: {
      es: [
        'Open Data I',
        'Fundamentos de Estadística',
        'Estadística Computacional',
        'Gestión de Proyectos en Ciencia de Datos',
      ],
      en: [
        'Open Data I',
        'Statistics Fundamentals',
        'Computational Statistics',
        'Data Science Project Management',
      ],
    },
  },
  {
    id: 'universidad-politecnica-chiapas',
    degree: {
      es: 'Grado en Ingeniería de Software',
      en: 'BSc in Software Engineering',
    },
    institution: 'Universidad Politécnica de Chiapas',
    location: {
      es: 'México',
      en: 'Mexico',
    },
    start: '2020',
    end: '2022',
  },
];

export const languages = {
  es: 'Español (Nativo) · Inglés (Nivel Profesional)',
  en: 'Spanish (Native) · English (Professional)',
} as Localized;
