import Section from '../../components/Section';
import { challenges, certifications } from '../../data/challenges';

export default function Challenges() {
  return (
    <div>
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Challenges & Certificaciones</h1>
          <p className="text-xl text-purple-100">
            Desafíos técnicos completados y certificaciones profesionales
          </p>
        </div>
      </div>

      <Section title="Challenges Técnicos">
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {challenge.platform}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              {challenge.link && (
                <a 
                  href={challenge.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Ver Solución →
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certificaciones" className="bg-gray-50">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
              <p className="text-gray-600 mb-2">{cert.issuer}</p>
              <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Ver Credencial →
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
