import type { Technology } from '../data/technologies';

interface TechCardProps {
  category: string;
  technologies: Technology[];
  color: string;
}

export default function TechCard({ category, technologies, color }: TechCardProps) {
  const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-600',
    gray: 'text-gray-700',
    blue: 'text-blue-600',
    orange: 'text-orange-600'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className={`text-2xl font-bold mb-6 capitalize ${colorClasses[color]}`}>
        {category}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{tech.icon}</div>
            <p className="text-sm text-gray-700 font-medium">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
