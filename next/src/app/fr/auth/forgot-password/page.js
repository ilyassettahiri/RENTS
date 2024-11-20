import ForgotPasswordView from 'src/sections/auth/forgot-password-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Mot de passe oublié - RENTS.ma | Réinitialisez votre mot de passe',
    description: 'Réinitialisez facilement le mot de passe de votre compte RENTS.ma. Entrez votre email pour recevoir les instructions de récupération.',
    keywords: 'Mot de passe oublié, Réinitialiser mot de passe, Récupération de compte RENTS.ma, Récupération de mot de passe',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/auth/forgot-password',
      title: 'Mot de passe oublié - RENTS.ma | Réinitialisez votre mot de passe',
      description: 'Réinitialisez facilement votre mot de passe RENTS.ma en suivant le processus de récupération.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an authentication-specific image if available
          width: 1200,
          height: 630,
          alt: 'Mot de passe oublié - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mot de passe oublié - RENTS.ma | Réinitialisez votre mot de passe',
      description: 'Suivez les étapes pour récupérer le mot de passe de votre compte RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an authentication-specific image if available
    },
    alternates: {
      canonical: 'https://rents.ma/fr/auth/forgot-password',
      languages: {
        en: 'https://rents.ma/en/auth/forgot-password',
        ar: 'https://rents.ma/ar/auth/forgot-password',
        fr: 'https://rents.ma/fr/auth/forgot-password',
      },
    },
  };
}

export default function ForgotPasswordPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="forgot-password-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Mot de passe oublié - RENTS.ma',
            url: 'https://rents.ma/fr/auth/forgot-password',
            description: 'Réinitialisez facilement et en toute sécurité le mot de passe de votre compte RENTS.ma.',
            potentialAction: {
              "@type": "Action",
              name: "Réinitialiser le mot de passe",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/fr/auth/forgot-password',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* Render Forgot Password Content */}
      <ForgotPasswordView />
    </>
  );
}
