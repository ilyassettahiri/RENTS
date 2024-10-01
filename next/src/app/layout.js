
import PropTypes from 'prop-types';

import ClientLayout from './client-layout';
import ClientAnalytics from './client-analytics';


export const metadata = {
  title: 'Rents.ma: Morocco Rentals Marketplace',
  description: 'Morocco Rentals Marketplace',
  icons: {
    icon: '/favicon/favicon.ico', // Make sure the path is correct relative to the public directory
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/manifest.json', // Ensure this path is correct
  themeColor: '#17c1e8',
};

// Import the client layout component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>{metadata.title}</title>
        <link rel="icon" href={metadata.icons.icon} />
        <link rel="shortcut icon" href={metadata.icons.shortcut} />
        <link rel="apple-touch-icon" href={metadata.icons.apple} />
        <link rel="manifest" href={metadata.manifest} />
        <meta name="theme-color" content={metadata.themeColor} />
        <meta name="description" content={metadata.description} />
      </head>
      <body>

        <ClientAnalytics />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
