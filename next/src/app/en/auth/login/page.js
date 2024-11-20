import LoginView from 'src/sections/auth/login-view';
import Script from 'next/script';

// ----------------------------------------------------------------------


export async function generateMetadata() {
  return {
    title: 'Login - RENTS.ma | Access Your Account',
    description: 'Login to your RENTS.ma account to explore and manage rentals. Secure access for renters and providers.',
    keywords: 'Login, RENTS.ma account, Access RENTS.ma, Rental management, Secure login',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/auth/login',
      title: 'Login - RENTS.ma | Access Your Account',
      description: 'Securely login to your RENTS.ma account and explore the leading rental marketplace in Morocco.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a login-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Login - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Login - RENTS.ma | Access Your Account',
      description: 'Login to your RENTS.ma account securely and explore Morocco’s leading rental platform.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a login-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/auth/login',
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
            name: 'Login - RENTS.ma',
            url: 'https://rents.ma/en/auth/login',
            description: 'Login to your RENTS.ma account securely to manage your rentals and explore the platform.',
            potentialAction: {
              "@type": "LoginAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/en/auth/login',
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
