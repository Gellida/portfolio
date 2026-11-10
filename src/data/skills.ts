import type { Localized } from './profile';

export interface SkillGroup {
  id: string;
  title: Localized;
  description: Localized;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: { es: 'Lenguajes', en: 'Languages' },
    description: {
      es: 'Base técnica y tipado en backend, frontend y datos.',
      en: 'Technical foundation and typing across backend, frontend and data.',
    },
    items: ['Python', 'Java', 'Kotlin', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL, MySQL)', 'C#'],
  },
  {
    id: 'backend',
    title: { es: 'Backend y arquitectura', en: 'Backend & Architecture' },
    description: {
      es: 'APIs, persistencia, seguridad y patrones de diseño.',
      en: 'APIs, persistence, security and design patterns.',
    },
    items: [
      'Spring Boot',
      'FastAPI',
      'Node.js / Express',
      'Microservicios',
      'REST APIs',
      'JWT · RBAC',
      'MVVM · MVC',
      'Firebase (Firestore, Realtime)',
      'Android (Java)',
    ],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    description: {
      es: 'Interfaces tipadas, accesibles y con SEO técnico.',
      en: 'Typed, accessible interfaces with technical SEO.',
    },
    items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vite', 'i18n ES/EN', 'SEO técnico'],
  },
  {
    id: 'ai',
    title: { es: 'IA aplicada', en: 'Applied AI' },
    description: {
      es: 'LLMs integrados en producto con control y trazabilidad.',
      en: 'LLMs integrated into product with control and traceability.',
    },
    items: [
      'LLMs para código',
      'Diseño de prompts',
      'Extracción estructurada de datos',
      'Agentes y Skills',
      'Fallback determinista',
    ],
  },
  {
    id: 'infra',
    title: { es: 'DevOps y cloud', en: 'DevOps & Cloud' },
    description: {
      es: 'Entrega continua y despliegue reproducible de bajo coste.',
      en: 'Continuous delivery and low-cost reproducible deployment.',
    },
    items: [
      'AWS (S3, CloudFront, OAC)',
      'Docker',
      'Docker Compose',
      'GitHub Actions (CI/CD)',
      'Caddy',
      'Cloudflare',
      'Git',
      'Postman',
    ],
  },
  {
    id: 'operations',
    title: { es: 'Soporte y operaciones', en: 'Support & Operations' },
    description: {
      es: 'Resolución de incidencias críticas en entornos de alta disponibilidad.',
      en: 'Critical incident resolution in high-availability environments.',
    },
    items: [
      'Diagnóstico L2/L3',
      'Análisis de logs estructurados',
      'Gestión de SLAs',
      'Ticketing',
      'Monitorización de APIs',
      'Análisis de causa raíz',
    ],
  },
];
