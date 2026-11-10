export interface Technology {
  name: string;
  icon: string;
}

export interface TechnologiesData {
  frontend: Technology[];
  backend: Technology[];
  tools: Technology[];
  learning: Technology[];
}

export const technologies: TechnologiesData = {
  frontend: [
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'TailwindCSS', icon: 'tailwind' },
    { name: 'Vite', icon: 'vite' },
    { name: 'HTML/CSS', icon: 'htmlcss' },
  ],
  backend: [
    { name: 'Python', icon: 'python' },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'Java (Spring Boot)', icon: 'spring' },
    { name: 'Node.js / Express', icon: 'node' },
    { name: 'Kotlin', icon: 'kotlin' },
    { name: 'C#', icon: 'dotnet' },
    { name: 'PostgreSQL · MySQL', icon: 'postgresql' },
    { name: 'REST APIs', icon: 'rest' },
    { name: 'Microservicios', icon: 'microservices' },
  ],
  tools: [
    { name: 'Docker', icon: 'docker' },
    { name: 'Docker Compose', icon: 'docker' },
    { name: 'Caddy', icon: 'caddy' },
    { name: 'Cloudflare', icon: 'cloudflare' },
    { name: 'GitHub Actions', icon: 'actions' },
    { name: 'AWS (S3 + CloudFront)', icon: 'aws' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Git', icon: 'github' },
    { name: 'Postman', icon: 'postman' },
  ],
  learning: [
    { name: 'Ciencia de Datos', icon: 'pandas' },
    { name: 'Pandas · SciPy', icon: 'pandas' },
    { name: 'Open Data', icon: 'openData' },
  ],
};
