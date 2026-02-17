import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jkellysites.com'), // Replace with actual domain when live
  title: {
    default: 'Jack Kelly | Premium Web Design & Development',
    template: '%s | Jack Kelly',
  },
  description: 'Custom, high-performance websites that turn visitors into customers. Specializing in premium design, fast load times, and SEO-optimized development for growing businesses.',
  keywords: ['web design', 'web development', 'premium websites', 'next.js', 'react', 'seo', 'jack kelly', 'freelance developer'],
  authors: [{ name: 'Jack Kelly', url: 'https://jkellysites.com' }],
  creator: 'Jack Kelly',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jkellysites.com',
    title: 'Jack Kelly | Premium Web Design & Development',
    description: 'Custom, high-performance websites that turn visitors into customers.',
    siteName: 'Jack Kelly Web Design',
    images: [
      {
        url: '/opengraph-image.png', // We'll rely on default or add one later
        width: 1200,
        height: 630,
        alt: 'Jack Kelly Web Design Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jack Kelly | Premium Web Design & Development',
    description: 'Custom, high-performance websites that turn visitors into customers.',
    creator: '@jkellysites', // Update if known
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased text-gray-300 bg-bg overflow-x-hidden`}>
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[#027DD5]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <Header />
        {children}
      </body>
    </html>
  );
}
