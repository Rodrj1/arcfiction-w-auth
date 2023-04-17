import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { Navbar } from '../components';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300'],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className={roboto.className}>
      <Head>
        <title>ARCFiction</title>
        <meta
          name="description"
          content="ARCFiction is a website that shows trending and popular media data. Search for your favorite movies and tv-shows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Toaster
        toastOptions={{
          duration: 1500,
          style: {
            color: 'green',
          },
        }}
      />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
