import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import Seo from '../../components/Seo';
import { projects } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';

export default function Projects() {
  const { language } = useLanguage();

  const seo =
    language === 'es'
      ? {
          title: 'Proyectos de desarrollo',
          description:
            'Explora los proyectos de José Gellida: desarrollo web, automatización, visualización de datos y soluciones construidas con React, TypeScript y AWS.',
        }
      : {
          title: 'Development Projects',
          description:
            'Explore José Gellida projects: web development, automation, data visualization, and solutions built with React, TypeScript, and AWS.',
        };

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/projects"
        language={language}
        image="/portadaweb.png"
        imageAlt={language === 'es' ? 'Colección de proyectos de José Gellida' : 'José Gellida projects collection'}
      />

      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'es' ? 'Proyectos' : 'Projects'}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Explora los proyectos que he desarrollado utilizando diferentes tecnologías y frameworks'
              : 'Explore the projects I have built using different technologies and frameworks'}
          </p>

          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/70 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 font-semibold">{language === 'es' ? 'Proyecto destacado' : 'Featured project'}</p>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">{language === 'es' ? 'Portafolio Web Personal' : 'Personal Web Portfolio'}</h2>
              <p className="text-slate-600 dark:text-slate-300">
                {language === 'es'
                  ? 'Este espacio queda listo para que muestres una imagen principal del proyecto (mockup general, captura de home o vista de arquitectura).'
                  : 'This space is ready for you to showcase a main project image (general mockup, home screenshot, or architecture view).'}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 min-h-56 shadow-sm">
              <img
                src={import.meta.env.BASE_URL + 'analytics.png'}
                alt={language === 'es' ? 'Captura de analytics del proyecto' : 'Project analytics screenshot'}
                className="w-full h-full object-cover object-center"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Section title={language === 'es' ? 'Todos los Proyectos' : 'All Projects'}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
