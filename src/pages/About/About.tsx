import Section from '../../components/Section';
import Seo from '../../components/Seo';
import { useLanguage } from '../../hooks/useLanguage';

export default function About() {
  const { language, t } = useLanguage();

  const seo =
    language === 'es'
      ? {
          title: 'Sobre mí',
          description:
            'Conoce la trayectoria de José Gellida: ingeniería de software, desarrollo fullstack, agentes de IA, ciencia de datos y experiencia profesional.',
        }
      : {
          title: 'About me',
          description:
            'Learn about José Gellida background: software engineering, fullstack development, AI agents, data science, and professional experience.',
        };

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/about"
        language={language}
        image="/yo.JPEG"
        imageAlt={language === 'es' ? 'José Gellida' : 'José Gellida portrait'}
      />

      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.header.title')}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {t('about.header.subtitle')}
          </p>
        </div>
      </div>

      <Section title={t('about.story.title')}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('about.story.who')}</h3>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              {t('about.story.p1')}
            </p>
            <p className="text-slate-700 dark:text-slate-200 mb-4">
              {t('about.story.p2')}
            </p>
            <p className="text-slate-700 dark:text-slate-200">
              {t('about.story.p3')}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">{t('about.experience.title')}</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="text-lg font-bold">{t('about.experience.role1')}</h4>
                <p className="text-slate-600 dark:text-slate-400">{t('about.experience.company1')}</p>
                <p className="text-slate-700 dark:text-slate-200 mt-2">
                  {t('about.experience.desc1')}
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="text-lg font-bold">{t('about.experience.role2')}</h4>
                <p className="text-slate-600 dark:text-slate-400">{t('about.experience.company2')}</p>
                <p className="text-slate-700 dark:text-slate-200 mt-2">
                  {t('about.experience.desc2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t('about.skills.title')} className="bg-white/50 dark:bg-slate-800/20 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{t('about.skills.frontend')}</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• {t('about.skills.frontend.item1')}</li>
              <li>• {t('about.skills.frontend.item2')}</li>
              <li>• {t('about.skills.frontend.item3')}</li>
              <li>• {t('about.skills.frontend.item4')}</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">{t('about.skills.backend')}</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• {t('about.skills.backend.item1')}</li>
              <li>• {t('about.skills.backend.item2')}</li>
              <li>• {t('about.skills.backend.item3')}</li>
              <li>• {t('about.skills.backend.item4')}</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">{t('about.skills.devops')}</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <li>• {t('about.skills.devops.item1')}</li>
              <li>• {t('about.skills.devops.item2')}</li>
              <li>• {t('about.skills.devops.item3')}</li>
              <li>• {t('about.skills.devops.item4')}</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
