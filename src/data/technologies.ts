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
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '💙' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'TailwindCSS', icon: '💨' },
    { name: 'HTML/CSS', icon: '🌐' },
    { name: 'Figma', icon: '🎨' }
  ],
  backend: [
    { name: 'Python', icon: '🐍' },
    { name: 'Java (Spring Boot)', icon: '☕' },
    { name: 'Kotlin', icon: '🎯' },
    { name: 'Node.js', icon: '💚' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'DynamoDB', icon: '🗄️' }
  ],
  tools: [
    { name: 'AWS (EC2/S3/Lambda)', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'OpenAI / LangChain', icon: '🤖' },
    { name: 'n8n', icon: '🔄' },
    { name: 'Git / GitHub', icon: '🐙' },
    { name: 'CI/CD', icon: '🚀' },
    { name: 'Kubernetes', icon: '⚙️' }
  ],
  learning: [
    { name: 'Ciencia de Datos', icon: '📊' },
    { name: 'Agentes de IA', icon: '🧠' },
    { name: 'Flutter', icon: '💙' },
    { name: 'Astro', icon: '🌠' }
  ]
};
