import { useState, type FormEvent } from 'react';
import Section from '../../components/Section';
import { trackEvent } from '../../hooks/useAnalytics';
import { useLanguage } from '../../hooks/useLanguage';

interface FormData {
  name: string;
  email: string;
  number: string;
  message: string;
}

export default function Contact() {
  const { language, t } = useLanguage();
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    // Validación básica
    if (!formData.name || !formData.email || !formData.number || !formData.message) {
      setStatus('error');
      setErrorMessage(t('contact.form.error.required'));
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.number,
          message: formData.message,
          subject:
            language === 'es'
              ? t('contact.form.subject').replace('{{name}}', formData.name)
              : t('contact.form.subject').replace('{{name}}', formData.name),
        })
      });

      const data = await response.json();

      if (data.success) {
        trackEvent('contact_form_submit');
        setStatus('success');
        setFormData({ name: '', email: '', number: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.message || t('contact.form.error.api'));
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t('contact.form.error.submit'));
    }
  };

  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.header.title')}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {t('contact.header.subtitle')}
          </p>
        </div>
      </div>

      <Section title={t('contact.section.title')}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-3xl mr-4">📧</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:gellida.dev@gmail.com" className="text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
                    gellida.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">💼</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/jose-gellida" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                  >
                    linkedin.com/in/jose-gellida
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">🐙</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">GitHub</h4>
                  <a 
                    href="https://github.com/gellida" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                  >
                    github.com/gellida
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">📱</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('contact.info.phone')}</h4>
                  <p className="text-slate-700 dark:text-slate-200">+34 692 073 771 </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
            
            {status === 'success' && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200 rounded-lg">
                ✅ {t('contact.form.success')}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200 rounded-lg">
                ❌ {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800/60 disabled:cursor-not-allowed"
                  placeholder={t('contact.form.placeholder.name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800/60 disabled:cursor-not-allowed"
                  placeholder={t('contact.form.placeholder.email')}
                />
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {t('contact.form.mobile')}
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800/60 disabled:cursor-not-allowed"
                  placeholder={t('contact.form.placeholder.mobile')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800/60 disabled:cursor-not-allowed"
                  placeholder={t('contact.form.placeholder.message')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.button.sending')}
                  </>
                ) : (
                  t('contact.form.button.send')
                )}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
