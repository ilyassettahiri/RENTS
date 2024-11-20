import RegisterView from 'src/sections/auth/register-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Register - RENTS.ma | Create Your Account',
    description: 'Create your RENTS.ma account and start exploring the leading rental marketplace in Morocco. Join renters and providers today!',
    keywords: 'Register, RENTS.ma signup, Create account, Rental platform registration, Join RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/auth/register',
      title: 'Register - RENTS.ma | Create Your Account',
      description: 'Sign up on RENTS.ma to access trusted rentals in Morocco for cars, properties, and more. Start renting or listing now!',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a register-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Register - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Register - RENTS.ma | Create Your Account',
      description: 'Join RENTS.ma today and access Morocco’s top rental platform for cars, properties, and equipment.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a register-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/auth/register',
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
            name: 'Register - RENTS.ma',
            url: 'https://rents.ma/en/auth/register',
            description: 'Create your RENTS.ma account to explore and manage rentals. Sign up today to start renting or listing items in Morocco.',
            potentialAction: {
              "@type": "RegisterAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/en/auth/register',
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
