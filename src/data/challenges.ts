export interface Challenge {
  id: string;
  title: string;
  platform: string;
  description: string;
  link?: string;
}


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
];
