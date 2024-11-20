
import PropTypes from 'prop-types';

import Script from 'next/script';
import { cookies } from 'next/headers';
import { SettingsProvider } from 'src/components/settings';

import ClientLayout from './client-layout';

import ClientAnalytics from './client-analytics';

export const metadata = {

  metadataBase: new URL('https://rents.ma'),
  title: 'RENTS.ma: Discover Morocco’s Leading Marketplace for Rentals - Cars, Bikes, Properties & More',
  description: 'Explore RENTS.ma, Morocco’s top rental marketplace offering a wide range of rental options including cars, bikes, properties, and equipment. Find trusted rentals with flexible terms across Morocco’s popular cities like Marrakech, Casablanca, and beyond.',
  keywords: 'Rentals in Morocco, Car rentals, Property rentals, Marrakech rentals, Casablanca rentals, Bike rentals',

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rents.ma/',
    title: 'RENTS.ma - Morocco’s Best Rental Marketplace',
    description: 'Find trusted rental options for cars, bikes, properties, and more in Morocco.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // Provide a high-quality image for Open Graph
        width: 512,
        height: 512,
        alt: 'RENTS.ma - Discover Morocco’s Leading Marketplace for Rentals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RENTS.ma - Morocco’s Best Rental Marketplace',
    description: 'Find trusted rental options for cars, bikes, properties, and more in Morocco.',
    image: '/favicon/android-chrome-512x512.png', // A Twitter-specific image
  },

  alternates: {
    canonical: 'https://rents.ma',
    languages: {
      en: 'https://rents.ma/en',
      ar: 'https://rents.ma/ar',
      fr: 'https://rents.ma/fr',
    },
  },

};

export const viewport = {

  width: 'device-width',

  themeColor: '#17c1e8',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false, // Prevent user scaling
};

export default function RootLayout({ children }) {

  const allCookies = Array.from(cookies());


  const langCookie = allCookies.find(cookie => cookie[0] === 'i18next');


  const lang = langCookie ? langCookie[1].value : 'en';



  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RENTS.ma",
    url: "https://rents.ma",
    logo: "https://rents.ma/favicon/android-chrome-192x192.png",
    description: "Morocco's top marketplace for rentals including cars, properties, and more.",
    sameAs: [
      "https://facebook.com/profile.php?id=61556972157814",
      "https://instagram.com/rents.ma1",
      "https://twitter.com/rents_ma",
    ],
  };



  return (
    <html lang={lang}>

      <body>


        <Script
          type="application/ld+json"
          id="structured-data"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />


        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZYRNGEDF1C"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZYRNGEDF1C');
          `}
        </Script>


        <ClientAnalytics />

        <SettingsProvider
          defaultSettings={{
            themeMode: 'light',
            themeDirection: lang === 'ar' ? 'rtl' : 'ltr',
            themeColorPresets: 'default',
          }}
        >
          <ClientLayout lang={lang}>{children}</ClientLayout>
        </SettingsProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
