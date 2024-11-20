import LoginView from 'src/sections/auth/login-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Connexion - RENTS.ma | Accédez à votre compte',
    description: 'Connectez-vous à votre compte RENTS.ma pour explorer et gérer vos locations. Accès sécurisé pour les locataires et les fournisseurs.',
    keywords: 'Connexion, Compte RENTS.ma, Accès RENTS.ma, Gestion des locations, Connexion sécurisée',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/auth/login',
      title: 'Connexion - RENTS.ma | Accédez à votre compte',
      description: 'Connectez-vous en toute sécurité à votre compte RENTS.ma et explorez la principale plateforme de location au Maroc.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a login-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Connexion - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Connexion - RENTS.ma | Accédez à votre compte',
      description: 'Connectez-vous en toute sécurité à votre compte RENTS.ma et découvrez la plateforme de location leader au Maroc.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a login-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/auth/login',
      languages: {
        en: 'https://rents.ma/en/auth/login',
        ar: 'https://rents.ma/ar/auth/login',
        fr: 'https://rents.ma/fr/auth/login',
      },
    },
  };
}

export default function LoginPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="login-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Connexion - RENTS.ma',
            url: 'https://rents.ma/fr/auth/login',
            description: 'Connectez-vous en toute sécurité à votre compte RENTS.ma pour gérer vos locations et explorer la plateforme.',
            potentialAction: {
              "@type": "LoginAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/fr/auth/login',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
              "requiresAuthentication": "true",
            },
          }),
        }}
      />
      {/* Render Login Content */}
      <LoginView />
    </>
  );
}
