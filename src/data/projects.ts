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
    description: 'Sitio web de portafolio con routing, diseño responsive y seguimiento de eventos para mostrar proyectos y experiencia.',
    descriptionEn: 'Portfolio website with routing, responsive design, and event tracking to showcase projects and experience.',
    technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'Lucide React', 'ESLint'],
    detailsPath: '/projects/portafolio-web'
  }
];
