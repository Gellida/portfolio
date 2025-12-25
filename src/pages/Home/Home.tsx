import { Link } from 'react-router-dom';
import Section from '../../components/Section';
import TechCard from '../../components/TechCard';
import { technologies } from '../../data/technologies';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">José García</h1>
          <p className="text-2xl md:text-3xl mb-8 text-blue-100">Programador Multiplataforma</p>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-blue-50">
            Bienvenido a mi portafolio. Explora mis proyectos, habilidades técnicas 
            y experiencia en desarrollo frontend, backend y móvil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/projects" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver Proyectos
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <Section 
        title="Tecnologías" 
        subtitle="Mi stack tecnológico"
        className="bg-gray-50"
      >
        <p className="text-lg mb-8 text-gray-700">
          Trabajo en el <span className="text-blue-600 font-semibold">mundo del desarrollo web</span> con 
          diversas tecnologías. Mi <span className="text-orange-500 font-semibold">experiencia y habilidades</span> incluyen:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TechCard category="Frontend" technologies={technologies.frontend} color="cyan" />
          <TechCard category="Backend" technologies={technologies.backend} color="gray" />
          <TechCard category="Herramientas" technologies={technologies.tools} color="blue" />
          <TechCard category="Aprendiendo" technologies={technologies.learning} color="orange" />
        </div>
      </Section>

      {/* Quick Links Section */}
      <Section title="Explora mi trabajo">
        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/projects" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">Proyectos</h3>
              <p className="text-gray-600">Explora mis proyectos de desarrollo web y móvil</p>
            </div>
          </Link>
          <Link to="/challenges" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">Challenges</h3>
              <p className="text-gray-600">Certificaciones y desafíos técnicos completados</p>
            </div>
          </Link>
          <Link to="/visual-thinking" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">Visual Thinking</h3>
              <p className="text-gray-600">Gráficas y visualizaciones de datos</p>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
}
