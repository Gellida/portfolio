import { Link } from 'react-router-dom';
import Section from '../../components/Section';
import { useLanguage } from '../../hooks/useLanguage';

export default function PortfolioDetails() {
  const { language } = useLanguage();

  const tools =
    language === 'es'
      ? [
          'AWS (S3, CloudFront) para hosting y despliegue del sitio',
          'React + TypeScript para componentes tipados y mantenibles',
          'TailwindCSS para estilos utilitarios y responsive design',
          'React Router para navegación multipágina',
          'Lucide React para iconografía consistente',
          'ESLint para reglas de calidad de código',
          'Google Analytics (eventos) para seguimiento de interacción en enlaces de proyectos',
          'Configuración de despliegue estático (S3/redirects) para hosting del sitio',
        ]
      : [
          'AWS (S3, CloudFront) for site hosting and deployment',
          'React + TypeScript for typed and maintainable components',
          'TailwindCSS for utility-first styles and responsive design',
          'React Router for multi-page navigation',
          'Lucide React for consistent iconography',
          'ESLint for code quality rules',
          'Google Analytics (events) to track interactions on project links',
          'Static deployment setup (S3/redirects) for site hosting',
        ];

  const highlights =
    language === 'es'
      ? [
          'Arquitectura por secciones y páginas con componentes reutilizables.',
          'Modo claro/oscuro y estilo visual coherente en toda la navegación.',
          'Tarjetas de proyectos y tecnologías alimentadas por archivos de datos.',
          'Enrutado declarativo para escalar nuevas vistas sin acoplar la UI.',
          'Base preparada para incorporar nuevos proyectos y casos de estudio.',
        ]
      : [
          'Section-based architecture with reusable page components.',
          'Light/dark mode and consistent visual style across navigation.',
          'Project and technology cards powered by data files.',
          'Declarative routing to scale new views without coupling UI.',
          'Foundation ready to add new projects and case studies.',
        ];

  const imageSlots = [
    {
      title: 'Analytics',
      hint: language === 'es' ? 'Eventos, paneles o conversiones' : 'Events, dashboards, or conversions',
      src: import.meta.env.BASE_URL + 'analytics.png',
      fit: 'contain',
      position: 'center',
    },
    {
      title: 'AWS / Deploy',
      hint: 'Architecture, S3, CloudFront, pipeline',
      src: import.meta.env.BASE_URL + 'aws.png',
      fit: 'contain',
      position: 'center',
    },
    {
      title: 'Performance (Lighthouse)',
      hint: language === 'es' ? 'Lighthouse, optimizaciones y resultados' : 'Lighthouse, optimizations, and results',
      src: import.meta.env.BASE_URL + 'web_lighthouse.png',
      fit: 'contain',
      position: 'top',
    },
    {
      title: language === 'es' ? 'Diseño UI' : 'UI Design',
      hint: language === 'es' ? 'Espacio libre para siguiente imagen' : 'Open space for next image',
      src: '',
    },
  ];

  return (
    <div>
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'es' ? 'Portafolio Web Personal' : 'Personal Web Portfolio'}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl">
            {language === 'es'
              ? 'Proyecto enfocado en presentar experiencia, stack tecnológico y trabajos destacados con una experiencia moderna, rápida y adaptable a diferentes dispositivos.'
              : 'Project focused on showcasing experience, technology stack, and featured work with a modern, fast, and device-adaptive experience.'}
          </p>
        </div>
      </div>


    <Section
      title={language === 'es' ? 'Herramientas utilizadas' : 'Tools used'}
      subtitle={language === 'es' ? 'Stack implementado en este proyecto' : 'Stack implemented in this project'}
    >
        <ul className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title={language === 'es' ? 'Galería de evidencias' : 'Evidence gallery'}
        subtitle={language === 'es' ? 'Espacios listos para tus imágenes clave' : 'Spaces ready for your key images'}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {imageSlots.map((slot) => (
            <div
              key={slot.title}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 min-h-52"
            >
              {slot.src ? (
                <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-900">
                    <img
                        src={slot.src}
                        alt={slot.title}
                        loading="lazy"
                        className={[
                        'w-full h-full',
                        slot.fit === 'contain' ? 'object-contain p-2' : 'object-cover',
                        slot.position === 'top' ? 'object-top' : 'object-center'
                        ].join(' ')}
                    />
                    </div>
              ) : (
                <div className="h-full min-h-52 border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 flex items-center justify-center text-center">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{slot.title}</p>
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mt-2">{language === 'es' ? 'Placeholder de imagen' : 'Image placeholder'}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{slot.hint}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

  

        <Section
          title={language === 'es' ? 'Detalles concretos' : 'Concrete details'}
          subtitle={language === 'es' ? 'Decisiones y alcance del portafolio' : 'Portfolio decisions and scope'}
        >
        <div className="space-y-4">
          {highlights.map((item) => (
            <p
              key={item}
              className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300"
            >
              {item}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            {language === 'es' ? 'Volver a proyectos' : 'Back to projects'}
          </Link>
        </div>
      </Section>
    </div>
  );
}
