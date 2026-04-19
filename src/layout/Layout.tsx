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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
