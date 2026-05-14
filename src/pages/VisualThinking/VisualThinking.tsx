import Section from '../../components/Section';
import Seo from '../../components/Seo';
import { useLanguage } from '../../hooks/useLanguage';

export default function VisualThinking() {
  const { language } = useLanguage();

  const seo =
    language === 'es'
      ? {
          title: 'Visual thinking y gráficas',
          description:
            'Visualizaciones, gráficas interactivas y análisis de datos de José Gellida para explorar rendimiento, tecnología y evolución de proyectos.',
        }
      : {
          title: 'Visual thinking and charts',
          description:
            'Interactive charts, data visualizations, and analysis by José Gellida to explore performance, technology, and project evolution.',
        };

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/visual-thinking"
        language={language}
        image="/web_lighthouse.png"
        imageAlt={language === 'es' ? 'Visualización de análisis y métricas' : 'Analysis and metrics visualization'}
      />

      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'es' ? 'Gráficas y Visuales' : 'Charts and Visual Thinking'}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Visualización de datos y análisis mediante gráficas interactivas'
              : 'Data visualization and analysis through interactive charts'}
          </p>
        </div>
      </div>

      <Section title={language === 'es' ? 'Visualizaciones de Datos' : 'Data Visualizations'}>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          {language === 'es'
            ? 'Esta sección contendrá gráficas interactivas y visualizaciones de datos creadas con Chart.js, D3.js y otras librerías de visualización.'
            : 'This section will contain interactive charts and data visualizations built with Chart.js, D3.js, and other visualization libraries.'}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">{language === 'es' ? 'Análisis de Rendimiento' : 'Performance Analysis'}</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">{language === 'es' ? 'Gráfica de rendimiento' : 'Performance chart'}</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">{language === 'es' ? 'Estadísticas de Proyectos' : 'Project Statistics'}</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">{language === 'es' ? 'Gráfica de estadísticas' : 'Statistics chart'}</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">{language === 'es' ? 'Distribución de Tecnologías' : 'Technology Distribution'}</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">{language === 'es' ? 'Gráfica circular' : 'Pie chart'}</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">{language === 'es' ? 'Línea de Aprendizaje' : 'Learning Timeline'}</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">{language === 'es' ? 'Timeline interactivo' : 'Interactive timeline'}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
