import type { Project } from '../data/projects';
import { Link } from 'react-router-dom';
import { trackEvent } from '../hooks/useAnalytics';
import { useLanguage } from '../hooks/useLanguage';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const title = language === 'en' ? (project.titleEn ?? project.title) : project.title;
  const description = language === 'en' ? (project.descriptionEn ?? project.description) : project.description;

  return (
    <div className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
      {project.image && (
        <div className="h-48 bg-gradient-to-br from-indigo-600 to-emerald-500"></div>
      )}
      {!project.image && (
        <div className="h-48 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-4 text-center">
          <div>
           <span className="text-slate-500 dark:text-slate-500 flex flex-col  "> 
                    <img
                        src={import.meta.env.BASE_URL + 'portadawebclaro.png'}
                        alt={language === 'es' ? 'Imagen del proyecto' : 'Project image'}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
            </span>

          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.detailsPath && (
            <Link
              to={project.detailsPath}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'details' })}
            >
              {language === 'es' ? 'Ver detalles' : 'View details'} {'->'}
            </Link>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'github' })}
            >
              {language === 'es' ? 'Ver en GitHub' : 'View on GitHub'} →
            </a>
          )}
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline"
              onClick={() => trackEvent('select_project', { project_name: title, link_type: 'demo' })}
            >
              {language === 'es' ? 'Ver Demo' : 'View Demo'} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
