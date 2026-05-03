import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: '/', label: t('nav.home') },
      { to: '/projects', label: t('nav.projects') },
      { to: '/challenges', label: t('nav.challenges') },
      { to: '/visual-thinking', label: t('nav.visualThinking') },
      { to: '/about', label: t('nav.about') },
      { to: '/contact', label: t('nav.contact') },
    ],
    [t],
  );

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="fixed w-full z-50 top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-lg text-white">
              J
            </div>
            <span className="font-bold text-xl tracking-tight">
              Jose<span className="text-indigo-500 dark:text-indigo-400">Gellida</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    `text-sm font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-400 ` +
                    (isActive(link.to)
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-300')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setLanguage('es')}
              aria-label={t('lang.spanish')}
              className={
                `inline-flex items-center rounded-lg border px-2 py-1 text-lg leading-none transition ` +
                (language === 'es'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')
              }
            >
              <span aria-hidden="true">🇪🇸</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label={t('lang.english')}
              className={
                `inline-flex items-center rounded-lg border px-2 py-1 text-lg leading-none transition ` +
                (language === 'en'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')
              }
            >
              <span aria-hidden="true">🇺🇸</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
              role="switch"
              aria-checked={isDark}
              className="relative inline-flex h-7 w-12 items-center rounded-full border border-slate-300 bg-slate-200 transition-colors dark:border-slate-600 dark:bg-slate-700"
            >
              <span
                className={
                  `inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ` +
                  (isDark ? 'translate-x-6' : 'translate-x-1')
                }
              />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage('es')}
              aria-label={t('lang.spanish')}
              className={
                `inline-flex items-center rounded-lg border px-2 py-1 text-lg leading-none transition ` +
                (language === 'es'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')
              }
            >
              <span aria-hidden="true">🇪🇸</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label={t('lang.english')}
              className={
                `inline-flex items-center rounded-lg border px-2 py-1 text-lg leading-none transition ` +
                (language === 'en'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')
              }
            >
              <span aria-hidden="true">🇺🇸</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
              role="switch"
              aria-checked={isDark}
              className="relative inline-flex h-7 w-12 items-center rounded-full border border-slate-300 bg-slate-200 transition-colors dark:border-slate-600 dark:bg-slate-700"
            >
              <span
                className={
                  `inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ` +
                  (isDark ? 'translate-x-6' : 'translate-x-1')
                }
              />
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus:outline-none"
              aria-label={isMenuOpen ? t('menu.close') : t('menu.open')}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={
                  `block w-full px-3 py-2 rounded-md text-base font-medium transition-colors ` +
                  (isActive(link.to)
                    ? 'text-indigo-500 dark:text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800')
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
