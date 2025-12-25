import Section from '../../components/Section';

export default function VisualThinking() {
  return (
    <div>
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gráficas & Visual Thinking</h1>
          <p className="text-xl text-green-100">
            Visualización de datos y análisis mediante gráficas interactivas
          </p>
        </div>
      </div>

      <Section title="Visualizaciones de Datos">
        <p className="text-lg text-gray-600 mb-8">
          Esta sección contendrá gráficas interactivas y visualizaciones de datos creadas con 
          Chart.js, D3.js y otras librerías de visualización.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Análisis de Rendimiento</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Gráfica de rendimiento</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Estadísticas de Proyectos</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Gráfica de estadísticas</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Distribución de Tecnologías</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Gráfica circular</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Timeline de Aprendizaje</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Timeline interactivo</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
