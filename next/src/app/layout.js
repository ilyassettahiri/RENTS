// No "use client" directive here

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
import ClientLayout from './client-layout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
