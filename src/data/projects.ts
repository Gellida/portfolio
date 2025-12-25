export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión Web',
    description: 'Aplicación web full-stack para gestión de inventarios con panel de administración.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'App Mobile de Delivery',
    description: 'Aplicación móvil multiplataforma para pedidos y entregas en tiempo real.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Dashboard interactivo para visualización de datos y métricas de negocio.',
    technologies: ['Next.js', 'Chart.js', 'TailwindCSS', 'Python'],
    github: 'https://github.com'
  }
];
