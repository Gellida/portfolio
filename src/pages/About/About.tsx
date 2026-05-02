import Section from '../../components/Section';

export default function About() {
  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Mí</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Conoce más sobre mi trayectoria y experiencia profesional
          </p>
        </div>
      </div>

      <Section title="Mi Historia">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">¿Quién soy?</h3>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              Soy un programador multiplataforma apasionado por crear soluciones tecnológicas 
              innovadoras. Mi experiencia abarca desde el desarrollo frontend con React y 
              TypeScript, hasta backend con Node.js y Python.
            </p>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              Me especializo en crear aplicaciones web modernas, eficientes y escalables, 
              siempre buscando las mejores prácticas y tecnologías más actuales.
            </p>
            <p className="text-slate-700 dark:text-slate-200">
              Constantemente me desafío a mí mismo aprendiendo nuevas tecnologías y 
              participando en proyectos que expanden mis habilidades.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Experiencia</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="text-lg font-bold">Desarrollador Full Stack</h4>
                <p className="text-slate-600 dark:text-slate-400">Empresa Tech • 2023 - Presente</p>
                <p className="text-slate-700 dark:text-slate-200 mt-2">
                  Desarrollo de aplicaciones web con React, Node.js y PostgreSQL
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="text-lg font-bold">Desarrollador Frontend</h4>
                <p className="text-slate-600 dark:text-slate-400">Startup Digital • 2022 - 2023</p>
                <p className="text-slate-700 dark:text-slate-200 mt-2">
                  Creación de interfaces modernas con React y TailwindCSS
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Skills" className="bg-white/50 dark:bg-slate-800/20 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Frontend</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• React & TypeScript</li>
              <li>• TailwindCSS & SASS</li>
              <li>• Next.js & Vite</li>
              <li>• Responsive Design</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Backend</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• Node.js & Express</li>
              <li>• Python & FastAPI</li>
              <li>• PostgreSQL & MongoDB</li>
              <li>• REST APIs</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">DevOps & Tools</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• Git & GitHub</li>
              <li>• AWS & Azure</li>
              <li>• Docker</li>
              <li>• CI/CD</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
