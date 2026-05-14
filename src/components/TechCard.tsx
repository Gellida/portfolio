import { memo } from 'react';
import type { Technology } from '../data/technologies';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiAstro,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiN8N,
  SiNodedotjs,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpring,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

interface TechCardProps {
  category: string;
  technologies: Technology[];
  color: string;
}

interface LogoItem {
  icon: IconType;
  className: string;
}

const logos: Record<string, LogoItem> = {
  react: { icon: SiReact, className: 'text-sky-500' },
  nextjs: { icon: SiNextdotjs, className: 'text-slate-900 dark:text-slate-100' },
  typescript: { icon: SiTypescript, className: 'text-blue-600' },
  javascript: { icon: SiJavascript, className: 'text-yellow-400' },
  tailwind: { icon: SiTailwindcss, className: 'text-cyan-500' },
  htmlcss: { icon: SiHtml5, className: 'text-orange-500' },
  figma: { icon: SiFigma, className: 'text-pink-500' },
  python: { icon: SiPython, className: 'text-blue-500' },
  spring: { icon: SiSpring, className: 'text-emerald-600' },
  kotlin: { icon: SiKotlin, className: 'text-violet-500' },
  node: { icon: SiNodedotjs, className: 'text-green-600' },
  fastapi: { icon: SiFastapi, className: 'text-emerald-500' },
  postgresql: { icon: SiPostgresql, className: 'text-blue-700' },
  mongodb: { icon: SiMongodb, className: 'text-green-600' },
  dynamodb: { icon: FaAws, className: 'text-orange-500' },
  aws: { icon: FaAws, className: 'text-orange-500' },
  docker: { icon: SiDocker, className: 'text-sky-500' },
  firebase: { icon: SiFirebase, className: 'text-amber-500' },
  openai: { icon: SiOpenai, className: 'text-emerald-700 dark:text-emerald-400' },
  n8n: { icon: SiN8N, className: 'text-fuchsia-500' },
  github: { icon: SiGithub, className: 'text-slate-900 dark:text-slate-100' },
  actions: { icon: SiGithubactions, className: 'text-blue-500' },
  kubernetes: { icon: SiKubernetes, className: 'text-blue-600' },
  pandas: { icon: SiPandas, className: 'text-indigo-500' },
  flutter: { icon: SiFlutter, className: 'text-sky-500' },
  astro: { icon: SiAstro, className: 'text-orange-500' }
};

function TechCard({ category, technologies, color }: TechCardProps) {
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
        {technologies.map((tech) => {
          const logo = logos[tech.icon];

          if (!logo) {
            return (
              <div key={tech.name} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl mb-2 grid place-items-center bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-semibold">
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{tech.name}</p>
              </div>
            );
          }

          const BrandIcon = logo.icon;

          return (
            <div key={tech.name} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl mb-2 grid place-items-center bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600/60">
                <BrandIcon className={`text-3xl ${logo.className}`} aria-hidden="true" />
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{tech.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TechCard);
