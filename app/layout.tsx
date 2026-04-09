import type { Metadata, Viewport } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import './globals.css';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema, generatePersonSchema } from '../lib/schema';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const BASE_URL = 'https://cek-group.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CEK Group — Engineering & Design Excellence',
    template: '%s | CEK Group',
  },
  description:
    'Engineered Integrity. Absolute Precision. Executive oversight for high-value infrastructure and long-term asset preservation. Established 1994.',
  keywords: [
    'civil engineering',
    'structural engineering',
    'build management',
    'facility management',
    'infrastructure development',
    'commercial construction',
    'industrial design',
    'sustainable engineering',
    'CEK Group',
    'Elie Khoury',
  ],
  authors: [{ name: 'CEK Group', url: BASE_URL }],
  creator: 'CEK Group',
  publisher: 'CEK Group',
  category: 'Engineering & Construction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    title: 'CEK Group — Engineering & Design Excellence',
    description:
      'Engineered Integrity. Absolute Precision. Executive oversight for high-value infrastructure and long-term asset preservation. Established 1994.',
    siteName: 'CEK Group',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CEK Group — Engineered Integrity. Absolute Precision.',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cekgroup',
    creator: '@cekgroup',
    title: 'CEK Group — Engineering & Design Excellence',
    description:
      'Engineered Integrity. Absolute Precision. Executive oversight for high-value infrastructure and long-term asset preservation.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#18281e',
};

const jsonLd = [
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateLocalBusinessSchema(),
  generatePersonSchema(),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <head>
        {/* Google Material Symbols — loaded separately as next/font doesn't support icon fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
