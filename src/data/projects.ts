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
    title: 'Agentes de IA para Investigación Lingüística',
    titleEn: 'AI Agents for Linguistic Research',
    description: 'Arquitectura de agentes de IA para investigación lingüística y pedagógica en colaboración con CSIC/UAM. Sistema de procesamiento de lenguaje natural con Next.js, React y Firebase que automatiza análisis de corpus textuales.',
    descriptionEn: 'AI agent architecture for linguistic and pedagogical research in collaboration with CSIC/UAM. Natural language processing system built with Next.js, React and Firebase that automates textual corpus analysis.',
    technologies: ['Next.js', 'React', 'Firebase', 'Python', 'OpenAI', 'TypeScript', 'Clean Architecture', 'MVVM'],
    detailsPath: '/projects/csic-uam-ai-agents'
  },
  {
    id: '2',
    title: 'Analizador de Sentimientos para Incidencias',
    titleEn: 'Sentiment Analyzer for Incident Prioritization',
    description: 'Solución de análisis de sentimientos inspirada en el trabajo diario en BBVA, diseñada para priorizar incidencias críticas en plataformas digitales mediante procesamiento de lenguaje natural y clasificación automática.',
    descriptionEn: 'Sentiment analysis solution inspired by daily work at BBVA, designed to prioritize critical incidents in digital platforms using natural language processing and automatic classification.',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'NLP', 'PostgreSQL', 'Docker', 'React'],
    detailsPath: '/projects/sentiment-analyzer'
  },
  {
    id: '3',
    title: 'App de Logística Android (Kotlin/Firebase)',
    titleEn: 'Android Logistics App (Kotlin/Firebase)',
    description: 'Aplicación de logística para Android con backend en Firebase (Firestore, Realtime Database y Cloud Functions). Arquitectura Clean Code y MVVM, integración con APIs externas y optimización de rendimiento en tiempo real.',
    descriptionEn: 'Logistics application for Android with Firebase backend (Firestore, Realtime Database and Cloud Functions). Clean Code and MVVM architecture, external API integrations and real-time performance optimization.',
    technologies: ['Kotlin', 'Android', 'Firebase', 'Firestore', 'Cloud Functions', 'MVVM', 'Clean Architecture'],
    detailsPath: '/projects/logistics-android'
  },
  {
    id: '4',
    title: 'Portafolio Web Personal',
    titleEn: 'Personal Web Portfolio',
    description: 'Sitio web de portafolio con routing, diseño responsive, soporte multiidioma y seguimiento de eventos para mostrar proyectos y experiencia.',
    descriptionEn: 'Portfolio website with routing, responsive design, multi-language support, and event tracking to showcase projects and experience.',
    technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'AWS S3'],
    detailsPath: '/projects/portafolio-web'
  },
  {
    id: '5',
    title: 'EDA: Análisis de Desigualdad Global',
    titleEn: 'EDA: Global Inequality Analysis',
    description: 'Data Story interactivo sobre 227 países del mundo. Análisis exploratorio de patrones económicos, demográficos y sociales con visualizaciones interactivas, pruebas estadísticas (Shapiro-Wilk, Chi-cuadrado, Pearson) y acceso al notebook Jupyter completo.',
    descriptionEn: 'Interactive Data Story about 227 countries. Exploratory data analysis of economic, demographic and social patterns with interactive visualizations, statistical tests (Shapiro-Wilk, Chi-square, Pearson) and access to complete Jupyter notebook.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'SciPy', 'Plotly', 'React', 'TypeScript', 'Data Science'],
    detailsPath: '/data-stories/countries-analysis'
  },
  {
    id: '6',
    title: 'OcularIA: Evaluador de Ojo Seco',
    titleEn: 'OcularIA: Dry Eye Evaluator',
    description: 'Cuestionario clínico digital de 6 preguntas que analiza síntomas de ojo seco mediante IA (Claude) y devuelve diagnóstico orientativo, nivel de riesgo y recomendaciones estructuradas.',
    descriptionEn: 'Digital 6-question clinical questionnaire that analyzes dry-eye symptoms with AI (Claude) and returns an indicative diagnosis, risk level, and structured recommendations.',
    technologies: ['React', 'TypeScript', 'IA', 'Claude API', 'Clinical Questionnaire', 'Secure Validation'],
    detailsPath: '/projects/ocularia'
  }
];
