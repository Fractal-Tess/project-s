import 'ui/styles.css';

import Footer from './Footer';
import Header from '~/components/Header';
import type { Metadata } from 'next';
import NextAuthProvider from '~/context/AuthProvider';

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className="bg-base-100 text-base-content min-h-screen"
      >
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
