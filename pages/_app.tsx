import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';
import { Navbar } from '../components';
import { SessionProvider } from 'next-auth/react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300'],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}

export default MyApp;
