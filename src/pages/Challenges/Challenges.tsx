import Section from '../../components/Section';
import { certifications } from '../../data/challenges';
import { useLanguage } from '../../hooks/useLanguage';

export default function Challenges() {
  const { language } = useLanguage();

  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'es' ? 'Desafíos y Certificaciones' : 'Challenges and Certifications'}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Desafíos técnicos completados y certificaciones profesionales'
              : 'Completed technical challenges and professional certifications'}
          </p>
        </div>
      </div>

    
      <Section title={language === 'es' ? 'Certificaciones' : 'Certifications'} className="bg-white/50 dark:bg-slate-800/20 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{cert.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{cert.issuer}</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">{cert.date}</p>
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline"
                > 
                  {language === 'es' ? 'Ver certificado' : 'View certificate'}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
