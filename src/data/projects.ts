export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  detailsPath?: string;
  /** One-line, measurable outcome shown on the card. */
  highlight?: string;
  highlightEn?: string;
  role?: string;
  roleEn?: string;
  period?: string;
  periodEn?: string;
}

export const projects: Project[] = [
  {
    id: '3',
    title: 'OcularIA: plataforma clínica multi-tenant',
    titleEn: 'OcularIA: multi-tenant clinical platform',
    description:
      'Plataforma para clínicas oftalmológicas con pre-diagnóstico asistido por IA. Un backend sirve proyectos aislados por subdominio y schema, con scoring OSDI, triaje por reglas y extracción de informes PDF y topografías OCT.',
    descriptionEn:
      'Platform for ophthalmology clinics with AI-assisted pre-diagnosis. One backend serves projects isolated by subdomain and schema, with OSDI scoring, rule-based triage and extraction from PDF reports and OCT topographies.',
    technologies: ['FastAPI', 'Next.js', 'PostgreSQL', 'JWT', 'Docker', 'LLM'],
    link: 'https://ocularia.puentedigital.space',
    detailsPath: '/projects/ocularia',
    highlight: '100% cobertura en la lógica clínica · multi-tenant por schema',
    highlightEn: '100% coverage of clinical logic · schema-level multi-tenancy',
    role: 'Diseño y desarrollo',
    roleEn: 'Design & development',
    period: 'nov 2025 – Actual',
    periodEn: 'Nov 2025 – Present',
  },
  {
    id: '1',
    title: 'Portafolio Web Personal',
    titleEn: 'Personal Web Portfolio',
    description:
      'SPA con arquitectura por capas, i18n propio ES/EN, tema claro/oscuro sin flash, SEO técnico dinámico, analytics y CI/CD con GitHub Actions a AWS S3 + CloudFront con OAC.',
    descriptionEn:
      'SPA with layered architecture, custom ES/EN i18n, flash-free light/dark theme, dynamic technical SEO, analytics and GitHub Actions CI/CD to AWS S3 + CloudFront with OAC.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS', 'AWS S3', 'CloudFront (OAC)', 'GitHub Actions'],
    image: 'analytics.png',
    link: 'https://www.josegellida.com',
    detailsPath: '/projects/portafolio-web',
    highlight: '100 Lighthouse · 156 kB gzip',
    highlightEn: '100 Lighthouse · 156 kB gzip',
    role: 'Diseño y desarrollo',
    roleEn: 'Design & development',
    period: '2025 – 2026',
    periodEn: '2025 – 2026',
  },
  {
    id: '2',
    title: 'EDA: Análisis de Desigualdad Global',
    titleEn: 'EDA: Global Inequality Analysis',
    description:
      'Data Story interactiva sobre 227 países con análisis exploratorio, contrastes estadísticos (Shapiro-Wilk, chi-cuadrado, Pearson) y notebook reproducible.',
    descriptionEn:
      'Interactive data story across 227 countries with exploratory analysis, statistical tests (Shapiro-Wilk, chi-square, Pearson) and a reproducible notebook.',
    technologies: ['Python', 'Pandas', 'SciPy', 'React', 'Canvas API'],
    detailsPath: '/data-stories/countries-analysis',
    highlight: '227 países · 3 familias de contrastes estadísticos',
    highlightEn: '227 countries · 3 families of statistical tests',
    role: 'Análisis y visualización',
    roleEn: 'Analysis & visualisation',
    period: '2026',
    periodEn: '2026',
  },
];
