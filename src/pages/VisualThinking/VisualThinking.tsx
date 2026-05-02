import Section from '../../components/Section';

export default function VisualThinking() {
  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gráficas & Visual Thinking</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Visualización de datos y análisis mediante gráficas interactivas
          </p>
        </div>
      </div>

      <Section title="Visualizaciones de Datos">
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Esta sección contendrá gráficas interactivas y visualizaciones de datos creadas con 
          Chart.js, D3.js y otras librerías de visualización.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">Análisis de Rendimiento</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">Gráfica de rendimiento</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">Estadísticas de Proyectos</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">Gráfica de estadísticas</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">Distribución de Tecnologías</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">Gráfica circular</p>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4">Timeline de Aprendizaje</h3>
            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-300">Timeline interactivo</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
