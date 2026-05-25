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
}

export const projects: Project[] = [
 
 
 
  {
    id: '1',
    title: 'Portafolio Web Personal',
    titleEn: 'Personal Web Portfolio',
    description: 'Sitio web de portafolio con routing, diseño responsive, soporte multiidioma y seguimiento de eventos para mostrar proyectos y experiencia.',
    descriptionEn: 'Portfolio website with routing, responsive design, multi-language support, and event tracking to showcase projects and experience.',
    technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'AWS S3'],
    detailsPath: '/projects/portafolio-web'
  },
  {
    id: '2',
    title: 'EDA: Análisis de Desigualdad Global',
    titleEn: 'EDA: Global Inequality Analysis',
    description: 'Data Story interactivo sobre 227 países del mundo. Análisis exploratorio de patrones económicos, demográficos y sociales con visualizaciones interactivas, pruebas estadísticas (Shapiro-Wilk, Chi-cuadrado, Pearson) y acceso al notebook Jupyter completo.',
    descriptionEn: 'Interactive Data Story about 227 countries. Exploratory data analysis of economic, demographic and social patterns with interactive visualizations, statistical tests (Shapiro-Wilk, Chi-square, Pearson) and access to complete Jupyter notebook.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'SciPy', 'Plotly', 'React', 'TypeScript', 'Data Science'],
    detailsPath: '/data-stories/countries-analysis'
  },
  {
    id: '3',
    title: 'OcularIA: Evaluador de Ojo Seco',
    titleEn: 'OcularIA: Dry Eye Evaluator',
    description: 'Cuestionario clínico digital de 6 preguntas que analiza síntomas de ojo seco mediante IA (Claude) y devuelve diagnóstico orientativo, nivel de riesgo y recomendaciones estructuradas.',
    descriptionEn: 'Digital 6-question clinical questionnaire that analyzes dry-eye symptoms with AI (Claude) and returns an indicative diagnosis, risk level, and structured recommendations.',
    technologies: ['React', 'TypeScript', 'IA', 'Claude API', 'Clinical Questionnaire', 'Secure Validation'],
    detailsPath: '/projects/ocularia'
  }
];
