import { GraduationCap, MapPin, ShieldCheck } from 'lucide-react';
import Section from '../../components/Section';
import Seo from '../../components/Seo';
import { education, languages, profile } from '../../data/profile';
import { experience, formatMonth, formatPeriod } from '../../data/experience';
import { skillGroups } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';

const groupColors = [
  'text-cyan-600 dark:text-cyan-400',
  'text-emerald-600 dark:text-emerald-400',
  'text-indigo-600 dark:text-indigo-400',
  'text-purple-600 dark:text-purple-400',
  'text-blue-600 dark:text-blue-400',
  'text-rose-600 dark:text-rose-400',
];

export default function About() {
  const { language, t } = useLanguage();
  const isEs = language === 'es';
  const l = <T extends { es: string; en: string }>(value: T) => value[language];
  const formatEducationDate = (value: string) =>
    value.length === 4 ? value : formatMonth(value, language);

  const seo = isEs
    ? {
        title: 'Sobre mí',
        description:
          'Trayectoria de José Gellida: desarrollo full-stack, datos e IA aplicada. Experiencia en BBVA, OcularIA, MWConsultores y Contpaqi.',
      }
    : {
        title: 'About me',
        description:
          "José Gellida's background: full-stack development, data and applied AI. Experience at BBVA, OcularIA, MWConsultores and Contpaqi.",
      };

  const story = isEs
    ? [
        'Soy desarrollador full-stack con experiencia en banca, ERP y producto sanitario. Trabajo con Python, Java, Kotlin, TypeScript y SQL, y me muevo entre backend, datos y frontend según lo que pida el problema.',
        'Actualmente curso el Grado en Ciencia de Datos en la Universidad Europea, tras estudiar Ingeniería de Software en la Universidad Politécnica de Chiapas. Mantengo OcularIA, una plataforma clínica multi-tenant para clínicas oftalmológicas, y antes pasé por BBVA (a través de Abai Group), Contpaqi y MWConsultores.',
        'En BBVA trabajé como Especialista de Soporte Digital L2/L3, diagnosticando incidencias críticas en aplicaciones móviles y canales web y priorizando resoluciones con datos operativos.',
      ]
    : [
        'I am a full-stack developer with experience in banking, ERP and healthcare products. I work with Python, Java, Kotlin, TypeScript and SQL, and move between backend, data and frontend depending on what the problem needs.',
        'I am currently studying for a BSc in Data Science at Universidad Europea, after studying Software Engineering at Universidad Politécnica de Chiapas. I maintain OcularIA, a multi-tenant clinical platform for ophthalmology clinics, and previously worked at BBVA (through Abai Group), Contpaqi and MWConsultores.',
        'At BBVA I worked as a Digital Support Specialist L2/L3, diagnosing critical incidents in mobile apps and web channels and prioritising resolutions with operational data.',
      ];

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/about"
        language={language}
        image="/yo.JPEG"
        imageAlt={isEs ? 'José Gellida' : 'José Gellida portrait'}
      />

      <header className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t('about.header.title')}</h1>
          <p className="max-w-3xl text-xl text-slate-600 dark:text-slate-400">
            {t('about.header.subtitle')}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={16} className="text-indigo-500" aria-hidden="true" />
              {l(profile.location)}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500" aria-hidden="true" />
              {l(profile.workPermit)}
            </li>
            <li className="inline-flex items-center gap-1.5">
              {l(languages)}
            </li>
          </ul>
        </div>
      </header>

      <Section title={t('about.story.title')}>
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr]">
          <div>
            <h3 className="mb-4 text-2xl font-bold">{t('about.story.who')}</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-200">
              {story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold">{t('about.education.title')}</h3>
            <div className="space-y-4">
              {education.map((entry) => {
                return (
                  <article
                    key={entry.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/40"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <GraduationCap size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-bold">{l(entry.degree)}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {entry.institution} · {l(entry.location)}
                        </p>
                        <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          {formatEducationDate(entry.start)} –{' '}
                          {entry.end ? formatEducationDate(entry.end) : isEs ? 'Actual' : 'Present'}
                        </p>
                      </div>
                    </div>
                    {entry.courses && (
                      <>
                        <p className="mt-4 text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                          {t('about.courses')}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {entry.courses[language].map((course) => (
                            <li
                              key={course}
                              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                            >
                              {course}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={t('about.experience.title')}
        className="border-y border-slate-200/60 bg-white/50 dark:border-slate-800/60 dark:bg-slate-800/20"
      >
        <ol className="space-y-6">
          {experience.map((entry) => {
            const isCurrent = entry.end === null;
            return (
              <li
                key={entry.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-bold">{l(entry.role)}</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {entry.company}
                        {entry.companyNote ? ` · ${l(entry.companyNote)}` : ''} · {l(entry.location)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {formatPeriod(entry, language)}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {isEs ? 'Actual' : 'Present'}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-slate-700 dark:text-slate-200">{l(entry.summary)}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700 dark:text-slate-200">
                  {entry.bullets[language].map((bullet) => (
                    <li key={bullet.slice(0, 32)}>{bullet}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section title={t('about.skills.title')}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article
              key={group.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
            >
              <h3 className={`mb-2 text-xl font-bold ${groupColors[index % groupColors.length]}`}>
                {l(group.title)}
              </h3>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {l(group.description)}
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-200">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-slate-400">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
