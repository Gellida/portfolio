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
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'ReactJS', icon: '⚛️' },
    { name: 'TailwindCSS', icon: '💨' },
    { name: 'SASS', icon: '💅' },
    { name: 'Figma', icon: '🎨' }
  ],
  backend: [
    { name: 'Python', icon: '🐍' },
    { name: 'NodeJS', icon: '💚' },
    { name: 'Laravel', icon: '🔺' },
    { name: 'ExpressJS', icon: '🚂' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Nginx', icon: '🔧' }
  ],
  tools: [
    { name: 'Git', icon: '📦' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Terminal', icon: '💻' },
    { name: 'VSCode', icon: '📝' },
    { name: 'npm', icon: '📦' },
    { name: 'OpenAI', icon: '🤖' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Azure', icon: '☁️' }
  ],
  learning: [
    { name: 'Power Automate', icon: '🔄' },
    { name: 'Astro', icon: '🚀' },
    { name: 'Docker', icon: '🐳' },
    { name: 'TypeScript', icon: '💙' },
    { name: 'Django', icon: '🎸' }
  ]
};
