import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { WishlistProvider } from '@/components/WishlistProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GarageKit — Japanese Auto Parts',
  description: 'Authentic Japanese auto parts, delivered fast across Bangladesh.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-bg font-sans text-txt antialiased">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <div className="pt-12">{children}</div>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
