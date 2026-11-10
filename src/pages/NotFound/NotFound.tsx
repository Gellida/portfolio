import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Mail } from 'lucide-react';
import Seo from '../../components/Seo';
import { useLanguage } from '../../hooks/useLanguage';

export default function NotFound() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.18) 0, rgba(20, 184, 166, 0.18) 10%, transparent 32%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.18) 0, rgba(99, 102, 241, 0.18) 10%, transparent 34%)',
        }}
      />

      <Seo
        title={isEs ? 'Página no encontrada' : 'Page not found'}
        description={
          isEs
            ? 'La página que buscas no existe o ha cambiado de ubicación.'
            : 'The page you are looking for does not exist or has moved.'
        }
        path="/404"
        language={language}
        noIndex
      />

      <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center">
          <p className="font-display text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
            404
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            {isEs ? 'Esta página no existe' : 'This page does not exist'}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
            {isEs
              ? 'Puede que el enlace esté mal escrito o que la página se haya movido. Te dejo algunos atajos para seguir navegando.'
              : 'The link may be misspelled or the page may have moved. Here are some shortcuts to keep browsing.'}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <ArrowLeft size={18} className="mr-2" />
              {isEs ? 'Volver al inicio' : 'Back to home'}
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <Compass size={18} className="mr-2" />
              {isEs ? 'Ver proyectos' : 'View projects'}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <Mail size={18} className="mr-2" />
              {isEs ? 'Contacto' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
