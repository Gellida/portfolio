import { trackEvent } from '../hooks/useAnalytics';
import { GitFork, Link2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-tight">
            Jose<span className="text-indigo-500 dark:text-indigo-400">Gellida</span>
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Programador Fullstack</p>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://github.com/gellida"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="GitHub"
            onClick={() => trackEvent('outbound_click', { url: 'https://github.com/gellida', label: 'GitHub' })}
          >
            <GitFork size={20} />
          </a>
          <a
            href="https://linkedin.com/in/jose-gellida"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
            onClick={() => trackEvent('outbound_click', { url: 'https://linkedin.com/in/jose-gellida', label: 'LinkedIn' })}
          >
            <Link2 size={20} />
          </a>
          <a
            href="mailto:gellida.dev@gmail.com"
            className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            aria-label="Email"
            onClick={() => trackEvent('outbound_click', { url: 'mailto:gellida.dev@gmail.com', label: 'Email' })}
          >
            <Mail size={20} />
          </a>
        </div>

        <div className="text-slate-500 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} José Gellida. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
