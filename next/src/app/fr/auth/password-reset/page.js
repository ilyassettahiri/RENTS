import PasswordResetView from 'src/sections/auth/password-reset-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Vérifiez votre compte - RENTS.ma | Sécurisez votre accès',
    description: 'Vérifiez votre compte RENTS.ma pour garantir un accès sécurisé à la principale plateforme de location au Maroc. Complétez votre inscription dès aujourd\'hui !',
    keywords: 'Vérification de compte, Vérifier compte RENTS.ma, Connexion sécurisée, Vérification d\'accès RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/auth/verify',
      title: 'Vérifiez votre compte - RENTS.ma | Sécurisez votre accès',
      description: 'Complétez la vérification de votre compte RENTS.ma et commencez à accéder à des services de location fiables au Maroc.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a verify-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Vérifiez votre compte - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Vérifiez votre compte - RENTS.ma | Sécurisez votre accès',
      description: 'Garantissez un accès sécurisé à votre compte RENTS.ma en complétant le processus de vérification.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a verify-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/auth/verify',
      languages: {
        en: 'https://rents.ma/en/auth/verify',
        ar: 'https://rents.ma/ar/auth/verify',
        fr: 'https://rents.ma/fr/auth/verify',
      },
    },
  };
}

export default function PasswordResetPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="verify-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Vérifiez votre compte - RENTS.ma',
            url: 'https://rents.ma/fr/auth/verify',
            description: 'Sécurisez votre compte sur RENTS.ma en complétant le processus de vérification. Accédez à des services de location fiables en toute sécurité.',
            potentialAction: {
              "@type": "VerifyAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/fr/auth/verify',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* Render Verification Content */}
      <PasswordResetView />
    </>
  );
}
