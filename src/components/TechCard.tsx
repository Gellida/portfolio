import type { Technology } from '../data/technologies';

interface TechCardProps {
  category: string;
  technologies: Technology[];
  color: string;
}

export default function TechCard({ category, technologies, color }: TechCardProps) {
  const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-600 dark:text-cyan-400',
    gray: 'text-gray-700 dark:text-gray-200',
    blue: 'text-blue-600 dark:text-blue-400',
    orange: 'text-orange-600 dark:text-orange-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500/40 transition-colors">
      <h3 className={`text-2xl font-bold mb-6 capitalize ${colorClasses[color]}`}>
        {category}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{tech.icon}</div>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
