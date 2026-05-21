import { useState, type FormEvent } from 'react';
import Seo from '../../components/Seo';
import { trackEvent } from '../../hooks/useAnalytics';
import { useLanguage } from '../../hooks/useLanguage';

interface FormData {
  name: string;
  email: string;
  number: string;
  message: string;
}

// Floating label input component
function FloatingInput({
  id,
  name,
  type = 'text',
  value,
  onChange,
  label,
  disabled,
  required,
}: {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        disabled={disabled}
        autoComplete="off"
        className={`
          peer w-full px-4 pt-6 pb-2 rounded-xl border text-slate-900 dark:text-white bg-white dark:bg-slate-800/70
          transition-all duration-200 outline-none
          ${active
            ? 'border-indigo-500 dark:border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
            : 'border-slate-200 dark:border-slate-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 font-medium pointer-events-none transition-all duration-200 select-none
          ${active
            ? 'top-2 text-xs text-indigo-500 dark:text-indigo-400'
            : 'top-4 text-sm text-slate-400 dark:text-slate-500'}
        `}
      >
        {label}
      </label>
    </div>
  );
}

// Floating label textarea
function FloatingTextarea({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
  required,
  maxLength = 800,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  disabled: boolean;
  required?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const pct = value.length / maxLength;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        rows={5}
        className={`
          w-full px-4 pt-6 pb-2 rounded-xl border text-slate-900 dark:text-white bg-white dark:bg-slate-800/70
          resize-none transition-all duration-200 outline-none
          ${active
            ? 'border-indigo-500 dark:border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
            : 'border-slate-200 dark:border-slate-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 font-medium pointer-events-none transition-all duration-200 select-none
          ${active
            ? 'top-2 text-xs text-indigo-500 dark:text-indigo-400'
            : 'top-4 text-sm text-slate-400 dark:text-slate-500'}
        `}
      >
        {label}
      </label>
      <div className="absolute bottom-3 right-4 flex items-center gap-2">
        <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-700" />
          <circle
            cx="10" cy="10" r="8" fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 8}`}
            strokeDashoffset={`${2 * Math.PI * 8 * (1 - pct)}`}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
            className={`transition-all duration-300 ${pct > 0.9 ? 'text-red-400' : 'text-indigo-500 dark:text-indigo-400'}`}
          />
        </svg>
        <span className={`text-xs tabular-nums ${pct > 0.9 ? 'text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

// Contact info card
function ContactCard({
  href,
  external,
  icon,
  label,
  value,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/40 transition-colors duration-200">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {value}
        </p>
      </div>
      {external && (
        <svg className="ml-auto flex-shrink-0 w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Tag>
  );
}

export default function Contact() {
  const { language, t } = useLanguage();
  const seo =
    language === 'es'
      ? {
          title: 'Contacto',
          description:
            'Contacta con José Gellida para proyectos de desarrollo, automatización, datos o colaboración profesional.',
        }
      : {
          title: 'Contact',
          description:
            'Contact José Gellida for development projects, automation, data work, or professional collaboration.',
        };
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!web3FormsAccessKey) {
      setStatus('error');
      setErrorMessage(t('contact.form.error.config'));
      return;
    }

    if (!formData.name || !formData.email || !formData.number || !formData.message) {
      setStatus('error');
      setErrorMessage(t('contact.form.error.required'));
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.number,
          message: formData.message,
          subject: t('contact.form.subject').replace('{{name}}', formData.name),
        }),
      });

      const data = await response.json();

      if (data.success) {
        trackEvent('contact_form_submit');
        setStatus('success');
        setFormData({ name: '', email: '', number: '', message: '' });
      } else {
        throw new Error(data.message || t('contact.form.error.api'));
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t('contact.form.error.submit'));
    }
  };

  const emailIcon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  const linkedinIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  const githubIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
  const phoneIcon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Seo
        title={seo.title}
        description={seo.description}
        path="/contact"
        language={language}
        image="/portadaweb.png"
        imageAlt={language === 'es' ? 'Página de contacto de José Gellida' : 'José Gellida contact page'}
      />

      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-400/10 dark:bg-violet-600/8 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-indigo-600 dark:text-indigo-400 mb-5">
            <span className="w-6 h-px bg-indigo-500 dark:bg-indigo-400" />
            {t('contact.header.title')}
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.05] mb-5">
            {language === 'es' ? (
              <>Hablemos de<br /><span className="text-indigo-600 dark:text-indigo-400">tu proyecto</span></>
            ) : (
              <>Let's talk about<br /><span className="text-indigo-600 dark:text-indigo-400">your project</span></>
            )}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {t('contact.header.subtitle')}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

          {/* Left: contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">
                {t('contact.info.title')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'es'
                  ? 'Elige el canal que prefieras.'
                  : 'Pick the channel that works for you.'}
              </p>
            </div>

            <div className="space-y-3">
              <ContactCard
                href="mailto:gellida.dev@gmail.com"
                icon={emailIcon}
                label="Email"
                value="gellida.dev@gmail.com"
              />
              <ContactCard
                href="https://linkedin.com/in/jose-gellida"
                external
                icon={linkedinIcon}
                label="LinkedIn"
                value="linkedin.com/in/jose-gellida"
              />
              <ContactCard
                href="https://github.com/gellida"
                external
                icon={githubIcon}
                label="GitHub"
                value="github.com/gellida"
              />
              <ContactCard
                href="tel:+34692073771"
                icon={phoneIcon}
                label={t('contact.info.phone')}
                value="+34 692 073 771"
              />
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {language === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/40 p-8 lg:p-10">
            {status === 'success' ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs leading-relaxed">
                  {t('contact.form.success')}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-7">
                  {t('contact.form.title')}
                </h2>

                {status === 'error' && (
                  <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      label={t('contact.form.name')}
                      disabled={status === 'loading'}
                      required
                    />
                    <FloatingInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      label={t('contact.form.email')}
                      disabled={status === 'loading'}
                      required
                    />
                  </div>

                  <FloatingInput
                    id="number"
                    name="number"
                    type="tel"
                    value={formData.number}
                    onChange={handleChange}
                    label={t('contact.form.mobile')}
                    disabled={status === 'loading'}
                    required
                  />

                  <FloatingTextarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    label={t('contact.form.message')}
                    disabled={status === 'loading'}
                    required
                  />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full overflow-hidden bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('contact.form.button.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.button.send')}
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
