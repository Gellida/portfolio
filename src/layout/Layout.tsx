import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePageTracking } from '../hooks/useAnalytics';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}
