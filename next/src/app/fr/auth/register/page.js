import RegisterView from 'src/sections/auth/register-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Créer un compte - RENTS.ma | Inscrivez-vous maintenant',
    description: 'Créez votre compte RENTS.ma et commencez à explorer la principale plateforme de location au Maroc. Rejoignez les locataires et les fournisseurs dès aujourd\'hui !',
    keywords: 'Créer un compte, Inscription RENTS.ma, Rejoignez RENTS.ma, Plateforme de location, Inscription à la location',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/auth/register',
      title: 'Créer un compte - RENTS.ma | Inscrivez-vous maintenant',
      description: 'Inscrivez-vous sur RENTS.ma pour accéder aux locations fiables au Maroc pour les voitures, propriétés, et plus encore. Commencez à louer ou à publier dès maintenant !',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a register-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Créer un compte - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Créer un compte - RENTS.ma | Inscrivez-vous maintenant',
      description: 'Rejoignez RENTS.ma dès aujourd\'hui et accédez à la principale plateforme de location au Maroc pour les voitures, propriétés et équipements.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a register-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/auth/register',
      languages: {
        en: 'https://rents.ma/en/auth/register',
        ar: 'https://rents.ma/ar/auth/register',
        fr: 'https://rents.ma/fr/auth/register',
      },
    },
  };
}

export default function RegisterPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="register-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Créer un compte - RENTS.ma',
            url: 'https://rents.ma/fr/auth/register',
            description: 'Créez votre compte RENTS.ma pour explorer et gérer vos locations. Inscrivez-vous dès aujourd\'hui pour commencer à louer ou publier des articles au Maroc.',
            potentialAction: {
              "@type": "RegisterAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/fr/auth/register',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* Render Registration Content */}
      <RegisterView />
    </>
  );
}
