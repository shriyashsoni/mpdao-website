'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
