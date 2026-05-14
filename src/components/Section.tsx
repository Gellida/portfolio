import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
            <span className="text-indigo-500 dark:text-indigo-400 mr-3">_</span>
            {title}
          </h2>
          {subtitle && <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
