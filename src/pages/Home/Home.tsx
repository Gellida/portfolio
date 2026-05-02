import { Link } from 'react-router-dom';
import { ChevronRight, GitFork, Link2, Mail } from 'lucide-react';
import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import TechCard from '../../components/TechCard'; 
import { projects } from '../../data/projects';
import { technologies } from '../../data/technologies';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-32 md:pb-28 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 space-y-6 z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-sm font-medium">
              <span className="flex w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Disponible para nuevos proyectos
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Transformando{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Datos</span>{' '}
              en decisiones y código en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Soluciones</span>.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
              Soy un Desarrollador Fullstack apasionado por construir aplicaciones escalables,
              con foco en buenas prácticas, rendimiento y una UI moderna.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/projects"
                className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center"
              >
                Ver Proyectos <ChevronRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-medium transition-colors flex items-center justify-center"
              >
                Contactar
              </Link>
            </div>

            <div className="flex space-x-5 pt-2">
              <a
                href="https://github.com/gellida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GitFork size={24} />
              </a>
              <a
                href="https://linkedin.com/in/jose-gellida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Link2 size={24} />
              </a>
              <a
                href="mailto:gellida.dev@gmail.com"
                className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Hero decoration */}
          <div className="hidden md:flex md:w-2/5 justify-end relative">
            <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl -top-10 -right-10"></div>
            <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-20"></div>
            <div className="relative border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl w-full max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3 font-mono text-sm text-slate-700 dark:text-slate-300">
                <p>
                  <span className="text-indigo-500 dark:text-indigo-400">import</span> pandas{' '}
                  <span className="text-indigo-500 dark:text-indigo-400">as</span> pd
                </p>
                <p>
                  <span className="text-indigo-500 dark:text-indigo-400">import</span> express{' '}
                  <span className="text-indigo-500 dark:text-indigo-400">from</span> 'express'
                </p>
                <p className="text-slate-500 dark:text-slate-500">// Initialize fullstack capabilities</p>
                <p>
                  <span className="text-emerald-600 dark:text-emerald-400">const</span> developer ={' '}
                  <span className="text-indigo-500 dark:text-indigo-400">new</span> FullStack({`{`}
                </p>
                <p className="pl-4">
                  frontend: <span className="text-amber-600 dark:text-amber-300">'React'</span>,
                </p>
                <p className="pl-4">
                  backend: <span className="text-amber-600 dark:text-amber-300">'Node.js'</span>,
                </p>
                <p className="pl-4">
                  data: <span className="text-amber-600 dark:text-amber-300">'SQL'</span>
                </p>
                <p>{`}`});</p>
                <p className="pt-2 text-emerald-600 dark:text-emerald-400">{`> System optimized and running...`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre mí preview */}
      <section className="py-20 bg-white dark:bg-slate-800/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-500 flex flex-col items-center"> 
                    <img
                        src={import.meta.env.BASE_URL + 'yo.JPEG'}
                        alt="Foto de Jose Gellida"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center">
                <span className="text-indigo-500 dark:text-indigo-400 mr-3">_</span> Sobre Mí
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Soy un desarrollador fullstack enfocado en construir productos web modernos.
                Me gusta trabajar de punta a punta: desde UI con React/TypeScript hasta APIs y bases de datos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-xl">3+</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Años de experiencia</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-xl">20+</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Proyectos completados</p>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
              >
                Ver más <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <Section title="Tecnologías" subtitle="Mi stack tecnológico">
        <p className="text-lg mb-8 text-slate-600 dark:text-slate-400">
          Trabajo en el <span className="text-indigo-600 dark:text-indigo-400 font-semibold">mundo del desarrollo web</span> con
          diversas tecnologías. Mi <span className="text-emerald-600 dark:text-emerald-400 font-semibold">experiencia</span> incluye:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TechCard category="Frontend" technologies={technologies.frontend} color="cyan" />
          <TechCard category="Backend" technologies={technologies.backend} color="gray" />
          <TechCard category="Herramientas" technologies={technologies.tools} color="blue" />
          <TechCard category="Aprendiendo" technologies={technologies.learning} color="orange" />
        </div>
      </Section>

      {/* Previsualización: Proyectos */}
      <Section title="Proyectos" subtitle="Una selección rápida">
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 dark:text-slate-400">Explora algunos proyectos destacados y luego entra a verlos todos.</p>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          >
            Ver todos <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="sm:hidden mt-6">
          <Link
            to="/projects"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          >
            Ver todos <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </Section>

      {/* Previsualización: Challenges */}
      <Section title="Challenges" subtitle="Certificaciones y desafíos">
        <div className="grid md:grid-cols-2 gap-6">
           
        </div>
        <div className="mt-6">
          <Link
            to="/challenges"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          >
            Ver todo <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 mb-6">
          <Mail size={32} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Trabajamos juntos?</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
          Estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente, conversemos.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-indigo-500/20"
        >
          Escríbeme
        </Link>
      </section>
    </div>
  );
}
