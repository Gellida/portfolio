import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../../data/projects';

export default function Projects() {
  return (
    <div>
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Proyectos</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Explora los proyectos que he desarrollado utilizando diferentes tecnologías y frameworks
          </p>

          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/70 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 font-semibold">Proyecto destacado</p>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">Portafolio Web Personal</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Este espacio queda listo para que muestres una imagen principal del proyecto
                (mockup general, captura de home o vista de arquitectura).
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 min-h-56 shadow-sm">
              <img
                src={import.meta.env.BASE_URL + 'analytics.png'}
                alt="Captura de analytics del proyecto"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Section title="Todos los Proyectos">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
