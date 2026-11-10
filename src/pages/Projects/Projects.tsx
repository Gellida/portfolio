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
            'Proyectos de José Gellida: plataforma clínica OcularIA (FastAPI + Next.js + PostgreSQL), portafolio React y análisis de datos con Python.',
        }
      : {
          title: 'Development Projects',
          description:
            "José Gellida's projects: the OcularIA clinical platform (FastAPI + Next.js + PostgreSQL), a React portfolio and Python data analysis.",
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
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">{language === 'es' ? 'OcularIA: plataforma clínica multi-tenant' : 'OcularIA: multi-tenant clinical platform'}</h2>
              <p className="text-slate-600 dark:text-slate-300">
                {language === 'es'
                  ? 'Plataforma para clínicas oftalmológicas: scoring OSDI, triaje por reglas, extracción de informes PDF y topografías OCT, y un backend que sirve proyectos aislados por subdominio y schema.'
                  : 'Platform for ophthalmology clinics: OSDI scoring, rule-based triage, extraction from PDF reports and OCT topographies, and one backend serving projects isolated by subdomain and schema.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['FastAPI', 'Next.js', 'PostgreSQL', 'Docker Compose'].map((tech) => (
                  <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="https://ocularia.puentedigital.space"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
              >
                {language === 'es' ? 'Ver producto en vivo' : 'View live product'} {'->'}
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-cyan-600 via-cyan-500 to-emerald-500 min-h-56 flex flex-col justify-center p-8 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {language === 'es' ? 'Lógica clínica' : 'Clinical logic'}
              </p>
              <p className="font-display text-5xl font-black leading-none">100%</p>
              <p className="mt-2 text-sm text-white/90">
                {language === 'es' ? 'cobertura con tests parametrizados' : 'coverage with parametrised tests'}
              </p>
              <p className="mt-6 border-t border-white/25 pt-4 text-sm text-white/90">
                {language === 'es' ? 'Multi-tenant por subdominio + schema de PostgreSQL' : 'Multi-tenant by subdomain + PostgreSQL schema'}
              </p>
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
