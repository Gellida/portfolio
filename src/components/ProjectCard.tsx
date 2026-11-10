import { memo } from 'react';
import type { Project } from '../data/projects';
import { Link } from 'react-router-dom';
import { trackEvent } from '../hooks/useAnalytics';
import { useLanguage } from '../hooks/useLanguage';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const title = isEs ? project.title : (project.titleEn ?? project.title);
  const description = isEs ? project.description : (project.descriptionEn ?? project.description);
  const highlight = isEs ? project.highlight : (project.highlightEn ?? project.highlight);
  const role = isEs ? project.role : (project.roleEn ?? project.role);
  const period = isEs ? project.period : (project.periodEn ?? project.period);
  const imageSrc = project.image ? import.meta.env.BASE_URL + project.image : null;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="relative h-48 overflow-hidden border-b border-slate-200 dark:border-slate-700">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-emerald-500"
            aria-hidden="true"
          >
            <span className="font-display text-6xl font-black text-white/90">
              {title.charAt(0)}
            </span>
          </div>
        )}
        {period && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {period}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {role && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
            {role}
          </p>
        )}
        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-400">
          {title}
        </h3>
        <p className="mb-4 text-slate-500 dark:text-slate-400">{description}</p>

        {highlight && (
          <p className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {highlight}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-4">
          {project.detailsPath && (
            <Link
              to={project.detailsPath}
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'details' })}
            >
              {isEs ? 'Ver detalles' : 'View details'} {'->'}
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'github' })}
            >
              {isEs ? 'Ver en GitHub' : 'View on GitHub'} {'->'}
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'demo' })}
            >
              {isEs ? 'Ver demo' : 'View demo'} {'->'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
