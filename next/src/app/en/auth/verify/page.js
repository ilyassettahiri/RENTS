import VerifyView from 'src/sections/auth/verify-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Verify Your Account - RENTS.ma | Secure Your Access',
    description: 'Verify your RENTS.ma account to ensure secure access to Morocco’s leading rental platform. Complete your registration today!',
    keywords: 'Account verification, Verify RENTS.ma account, Secure login, RENTS.ma access verification',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/auth/verify',
      title: 'Verify Your Account - RENTS.ma | Secure Your Access',
      description: 'Complete your RENTS.ma account verification and start accessing trusted rental services in Morocco.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a verify-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Verify Your Account - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Verify Your Account - RENTS.ma | Secure Your Access',
      description: 'Ensure secure access to your RENTS.ma account by completing the verification process.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a verify-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/auth/verify',
      languages: {
        en: 'https://rents.ma/en/auth/verify',
        ar: 'https://rents.ma/ar/auth/verify',
        fr: 'https://rents.ma/fr/auth/verify',
      },
    },
  };
}

export default function VerifyPage() {


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
            name: 'Verify Your Account - RENTS.ma',
            url: 'https://rents.ma/en/auth/verify',
            description: 'Secure your account on RENTS.ma by completing the verification process. Access trusted rental services securely.',
            potentialAction: {
              "@type": "VerifyAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/en/auth/verify',
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
      <VerifyView />
    </>
  );


}
