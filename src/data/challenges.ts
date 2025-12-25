export interface Challenge {
  id: string;
  title: string;
  platform: string;
  description: string;
  link?: string;
}

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Frontend Mentor - E-commerce Product Page',
    platform: 'Frontend Mentor',
    description: 'Challenge de página de producto con carrito de compras interactivo.',
    link: '#'
  },
  {
    id: '2',
    title: 'LeetCode - Top 100 Liked',
    platform: 'LeetCode',
    description: 'Resolución de los 100 problemas más populares en algoritmos y estructuras de datos.',
    link: '#'
  }
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    date: '2024',
    link: '#'
  },
  {
    id: '2',
    title: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: '2023',
    link: '#'
  }
];
