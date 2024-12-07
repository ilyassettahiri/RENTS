

import PropTypes from 'prop-types';


import PasswordResetView from 'src/sections/auth/password-reset-view';
import Script from 'next/script';



// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Reset Your Password - RENTS.ma | Secure Your Account',
    description: 'Reset your RENTS.ma account password to continue accessing trusted rental services in Morocco.',
    keywords: 'Password reset, RENTS.ma password recovery, Secure login, Reset account password',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/auth/password-reset',
      title: 'Reset Your Password - RENTS.ma | Secure Your Account',
      description: 'Secure your account by resetting your password.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png',
          width: 1200,
          height: 630,
          alt: 'Reset Your Password - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Reset Your Password - RENTS.ma | Secure Your Account',
      description: 'Secure your account by resetting your password.',
      image: '/favicon/android-chrome-512x512.png',
    },
    alternates: {
      canonical: 'https://rents.ma/en/auth/password-reset',
      languages: {
        en: 'https://rents.ma/en/auth/password-reset',
        ar: 'https://rents.ma/ar/auth/password-reset',
        fr: 'https://rents.ma/fr/auth/password-reset',
      },
    },
  };
}

export default function PasswordResetPage({ searchParams }) {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="reset-password-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Reset Your Password - RENTS.ma',
            url: 'https://rents.ma/en/auth/password-reset',
            description: 'Reset your password to secure your account on RENTS.ma.',
          }),
        }}
      />
      {/* Render Password Reset Content */}
      <PasswordResetView searchParams={searchParams} />
    </>
  );
}
PasswordResetPage.propTypes = {
  searchParams: PropTypes.object.isRequired,
};
