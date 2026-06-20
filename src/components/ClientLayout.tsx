'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

import { ConnectModalProvider } from '@/context/ConnectModalContext';
import ConnectModal from './ConnectModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <ConnectModalProvider>
      {isHomePage ? (
        <main>{children}</main>
      ) : (
        <>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </>
      )}
      <ConnectModal />
    </ConnectModalProvider>
  );
}
