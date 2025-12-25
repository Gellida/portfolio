import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../../data/projects';

export default function Projects() {
  return (
    <div>
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Proyectos</h1>
          <p className="text-xl text-blue-100">
            Explora los proyectos que he desarrollado utilizando diferentes tecnologías y frameworks
          </p>
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
