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
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TailwindCSS', icon: 'tailwind' },
    { name: 'HTML/CSS', icon: 'htmlcss' },
    { name: 'Figma', icon: 'figma' }
  ],
  backend: [
    { name: 'Python', icon: 'python' },
    { name: 'Java (Spring Boot)', icon: 'spring' },
    { name: 'Kotlin', icon: 'kotlin' },
    { name: 'Node.js', icon: 'node' },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'DynamoDB', icon: 'dynamodb' }
  ],
  tools: [
    { name: 'AWS (EC2/S3/Lambda)', icon: 'aws' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'OpenAI / LangChain', icon: 'openai' },
    { name: 'n8n', icon: 'n8n' },
    { name: 'Git / GitHub', icon: 'github' },
    { name: 'CI/CD', icon: 'actions' },
    { name: 'Kubernetes', icon: 'kubernetes' }
  ],
  learning: [
    { name: 'Ciencia de Datos', icon: 'pandas' },
    { name: 'Agentes de IA', icon: 'openai' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'Astro', icon: 'astro' }
  ]
};
