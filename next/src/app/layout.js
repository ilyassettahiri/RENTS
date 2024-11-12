
import PropTypes from 'prop-types';

import Script from 'next/script';
import { cookies } from 'next/headers';

import ClientLayout from './client-layout';

import ClientAnalytics from './client-analytics';
import { SettingsProvider } from 'src/components/settings';

export const metadata = {
  title: 'RENTS.ma: Discover Morocco’s Leading Marketplace for Rentals - Cars, Bikes, Properties & More',
  description: 'Explore RENTS.ma, Morocco’s top rental marketplace offering a wide range of rental options including cars, bikes, properties, and equipment. Find trusted rentals with flexible terms across Morocco’s popular cities like Marrakech, Casablanca, and beyond.',

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',


};

export const viewport = {

  width: 'device-width',
  initialScale: 1,
  themeColor: '#17c1e8',
};

export default function RootLayout({ children }) {

  const allCookies = Array.from(cookies());


  const langCookie = allCookies.find(cookie => cookie[0] === 'i18next');


  const lang = langCookie ? langCookie[1].value : 'en';

  return (
    <html lang={lang}>

      <body>



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
