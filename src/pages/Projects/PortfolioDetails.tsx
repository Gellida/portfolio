import { Link } from 'react-router-dom';
import Section from '../../components/Section';

const tools = [
  'AWS (S3, CloudFront) para hosting y despliegue del sitio', 
  'React + TypeScript para componentes tipados y mantenibles', 
  'TailwindCSS para estilos utilitarios y responsive design',
  'React Router para navegacion multipagina',
  'Lucide React para iconografia consistente',
  'ESLint para reglas de calidad de codigo',
  'Google Analytics (eventos) para seguimiento de interaccion en enlaces de proyectos',
  'Configuracion de despliegue estatico (S3/redirects) para hosting del sitio'
];

const highlights = [
  'Arquitectura por secciones y paginas con componentes reutilizables.',
  'Modo claro/oscuro y estilo visual coherente en toda la navegacion.',
  'Tarjetas de proyectos y tecnologias alimentadas por archivos de datos.',
  'Enrutado declarativo para escalar nuevas vistas sin acoplar la UI.',
  'Base preparada para incorporar nuevos proyectos y casos de estudio.'
];

const imageSlots = [
  {
    title: 'Analytics',
    hint: 'Eventos, paneles o conversiones',
    src: import.meta.env.BASE_URL + 'analytics.png',
    fit: 'contain',
    position: 'center'
  },
  {
    title: 'AWS / Deploy',
    hint: 'Arquitectura, S3, CloudFront, pipeline',
    src: import.meta.env.BASE_URL + 'aws.png',
    fit: 'contain',
    position: 'center'
  },
  {
    title: 'Performance (Lighthouse)',
    hint: 'Lighthouse, optimizaciones y resultados',
    src: import.meta.env.BASE_URL + 'web_lighthouse.png',
    fit: 'contain',
    position: 'top'
  },
  {
    title: 'Diseno UI',
    hint: 'Espacio libre para siguiente imagen',
    src: ''
  }
];
export default function PortfolioDetails() {
  return (
    <div>
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Portafolio Web Personal</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl">
            Proyecto enfocado en presentar experiencia, stack tecnologico y trabajos destacados
            con una experiencia moderna, rapida y adaptable a diferentes dispositivos.
          </p>
        </div>
      </div>


    <Section title="Herramientas utilizadas" subtitle="Stack implementado en este proyecto">
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

      <Section title="Galeria de evidencias" subtitle="Espacios listos para tus imagenes clave">
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
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mt-2">Placeholder de imagen</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{slot.hint}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

  

      <Section title="Detalles concretos" subtitle="Decisiones y alcance del portafolio">
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
            Volver a proyectos
          </Link>
        </div>
      </Section>
    </div>
  );
}
