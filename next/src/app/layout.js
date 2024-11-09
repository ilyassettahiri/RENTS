
import PropTypes from 'prop-types';

import Script from 'next/script';

import ClientLayout from './client-layout';
import ClientAnalytics from './client-analytics';


export const metadata = {
  title: 'RENTS.ma: Discover Morocco’s Leading Marketplace for Rentals - Cars, Bikes, Properties & More',
  description: 'Explore RENTS.ma, Morocco’s top rental marketplace offering a wide range of rental options including cars, bikes, properties, and equipment. Find trusted rentals with flexible terms across Morocco’s popular cities like Marrakech, Casablanca, and beyond.',

  icons: {
    icon: '/favicon.png', // Make sure the path is correct relative to the public directory
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#17c1e8',

};



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>


        {/* Add Google Analytics script here */}
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

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
