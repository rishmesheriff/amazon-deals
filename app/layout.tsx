import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Amazon Deals — Better prices, less searching',
  description:
    'Discover Amazon deals with savings of 15% or more across electronics, home, fashion, beauty, and more.',
  openGraph: {
    title: 'Amazon Deals — Better prices, less searching',
    description: 'Discover worthwhile Amazon discounts without the endless scroll.',
    type: 'website',
    images: [
      {
        url: new URL('/og.png', process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000').toString(),
        width: 1200,
        height: 630,
        alt: 'Amazon Deals — Better prices. Less searching.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Deals — Better prices, less searching',
    description: 'Discover worthwhile Amazon discounts without the endless scroll.',
    images: [new URL('/og.png', process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000').toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

