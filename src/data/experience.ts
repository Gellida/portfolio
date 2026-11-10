import type { Localized } from './profile';

export interface ExperienceEntry {
  id: string;
  role: Localized;
  company: string;
  companyNote?: Localized;
  location: Localized;
  /** Formato YYYY-MM */
  start: string;
  /** Formato YYYY-MM. null = puesto actual */
  end: string | null;
  type: 'full-time' | 'freelance';
  summary: Localized;
  bullets: { es: string[]; en: string[] };
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'bbva',
    role: {
      es: 'Especialista de Soporte Digital (L2/L3)',
      en: 'Digital Support Specialist (L2/L3)',
    },
    company: 'Abai Group',
    companyNote: {
      es: 'Consultoría para BBVA',
      en: 'Consulting for BBVA',
    },
    location: { es: 'Madrid, España', en: 'Madrid, Spain' },
    start: '2025-03',
    end: '2026-11',
    type: 'full-time',
    summary: {
      es: 'Soporte técnico especializado sobre los canales digitales de BBVA.',
      en: 'Specialised technical support for BBVA digital channels.',
    },
    bullets: {
      es: [
        'Análisis y diagnóstico de incidencias críticas en aplicaciones móviles y plataformas web, usando datos para priorizar resoluciones y mejorar la eficiencia del canal digital.',
        'Análisis, clasificación y priorización de mensajes recibidos en el buzón de atención.',
        'Colaboración en el diseño de flujos de trabajo automatizados que reducen tiempos de respuesta en la gestión de reclamaciones y sugerencias.',
        'Testeo y validación de sistemas de automatización con IA y soluciones para optimizar la gestión de incidencias en entornos bancarios de gran escala.',
      ],
      en: [
        'Analysis and diagnosis of critical incidents across mobile apps and web platforms, using data to prioritise resolutions and improve digital channel efficiency.',
        'Analysis, classification and prioritisation of messages received in the support inbox.',
        'Helped design automated workflows that reduce response times for complaints and suggestions.',
        'Tested and validated AI automation systems and solutions to optimise incident management in large-scale banking environments.',
      ],
    },
    stack: ['SQL', 'L2/L3', 'SLAs', 'Root cause analysis'],
  },
  {
    id: 'ocularia',
    role: {
      es: 'Full-Stack Developer (Freelance / Independiente)',
      en: 'Full-Stack Developer (Freelance)',
    },
    company: 'OcularIA',
    location: { es: 'Madrid, España (Remoto)', en: 'Madrid, Spain (Remote)' },
    start: '2025-11',
    end: null,
    type: 'freelance',
    summary: {
      es: 'Plataforma clínica multi-tenant para la evaluación de ojo seco.',
      en: 'Multi-tenant clinical platform for dry-eye assessment.',
    },
    bullets: {
      es: [
        'Diseñé e implementé de cero una arquitectura multi-tenant en producción (FastAPI, Next.js, PostgreSQL) que sirve a múltiples proyectos aislados por subdominio y schema de base de datos.',
        'Integré LLMs con patrón de fallback determinista, diseño de prompts y extracción estructurada de datos, incluyendo agentes y Skills para análisis y diagnóstico.',
        'Construí un backend con trazabilidad completa (request-id, logging estructurado con pino y monitorización de APIs de IA) para garantizar la disponibilidad del servicio.',
        'Gestiono el ciclo de vida completo: CI/CD en GitHub Actions y despliegue reproducible con Docker Compose, reverse proxy y túnel seguro (Caddy + Cloudflare Tunnel).',
      ],
      en: [
        'Designed and built from scratch a multi-tenant architecture in production (FastAPI, Next.js, PostgreSQL) serving multiple projects isolated by subdomain and database schema.',
        'Integrated LLMs with a deterministic fallback pattern, prompt design and structured data extraction, including agents and Skills for analysis and diagnosis.',
        'Built a backend with full traceability (request-id, structured logging with pino and AI API monitoring) to guarantee service availability.',
        'Own the full lifecycle: GitHub Actions CI/CD and reproducible deployment with Docker Compose, reverse proxy and secure tunnel (Caddy + Cloudflare Tunnel).',
      ],
    },
    stack: ['FastAPI', 'Next.js', 'PostgreSQL', 'JWT', 'Docker Compose', 'Caddy', 'Cloudflare Tunnel', 'LLM'],
  },
  {
    id: 'mwconsultores',
    role: {
      es: 'Desarrollador Web',
      en: 'Web Developer',
    },
    company: 'MWConsultores',
    location: { es: 'México', en: 'Mexico' },
    start: '2023-08',
    end: '2023-12',
    type: 'full-time',
    summary: {
      es: 'ERP full-stack para la gestión de servicios de seguridad.',
      en: 'Full-stack ERP for security services management.',
    },
    bullets: {
      es: [
        'Desarrollo integral (full-stack) de un ERP para la gestión de servicios de seguridad con backend Node.js, React y PostgreSQL.',
        'Atención y soporte directo a usuarios finales durante la adopción del ERP: resolución de incidencias, documentación de procesos y capacitación.',
        'Mejoras continuas basadas en el feedback de clientes, elevando la estabilidad, usabilidad y satisfacción general del sistema.',
      ],
      en: [
        'End-to-end (full-stack) development of an ERP for security services with a Node.js backend, React and PostgreSQL.',
        'Direct support to end users during ERP adoption: incident resolution, process documentation and training.',
        'Continuous improvements based on customer feedback, increasing system stability, usability and overall satisfaction.',
      ],
    },
    stack: ['Node.js', 'React', 'PostgreSQL'],
  },
  {
    id: 'contpaqi',
    role: {
      es: 'Desarrollador Java (Backend)',
      en: 'Java Developer (Backend)',
    },
    company: 'Contpaqi',
    location: { es: 'México', en: 'Mexico' },
    start: '2024-02',
    end: '2024-11',
    type: 'full-time',
    summary: {
      es: 'Servicios backend y facturación para sistemas de alta disponibilidad.',
      en: 'Backend services and billing for high-availability systems.',
    },
    bullets: {
      es: [
        'Desarrollo de servicios backend con Java y Spring Boot para sistemas de alta disponibilidad y gestión de microservicios.',
        'Mantenimiento de infraestructuras críticas y optimización de bases de datos del ecosistema de software.',
        'Desarrollé una aplicación web de facturación integrada en Contpaqi y añadí nuevas implementaciones gráficas para un punto de venta Android (Java).',
      ],
      en: [
        'Built backend services with Java and Spring Boot for high-availability systems and microservice management.',
        'Maintained critical infrastructure and optimised databases across the software ecosystem.',
        'Built a billing web application integrated with Contpaqi and added new graphical features to an Android point-of-sale app (Java).',
      ],
    },
    stack: ['Java', 'Spring Boot', 'SQL', 'Microservices', 'Android'],
  },
];

const MONTHS: Record<'es' | 'en', string[]> = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export function formatMonth(value: string, language: 'es' | 'en'): string {
  const [year, month] = value.split('-').map(Number);
  return `${MONTHS[language][month - 1]} ${year}`;
}

export function formatPeriod(entry: ExperienceEntry, language: 'es' | 'en'): string {
  const end = entry.end
    ? formatMonth(entry.end, language)
    : language === 'es'
      ? 'Actual'
      : 'Present';
  return `${formatMonth(entry.start, language)} – ${end}`;
}

export function getExperienceYears(): number {
  const starts = experience.map((entry) => {
    const [year, month] = entry.start.split('-').map(Number);
    return new Date(year, month - 1, 1).getTime();
  });
  const earliest = new Date(Math.min(...starts));
  const years = (Date.now() - earliest.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(years));
}
