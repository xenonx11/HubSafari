import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alegreya, Belleza } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-belleza',
});

export const metadata: Metadata = {
  title: 'HubSafari - Delicious Food, Delivered.',
  description: 'A delightful restaurant experience, right at your fingertips.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alegreya.variable} ${belleza.variable} dark`} suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
