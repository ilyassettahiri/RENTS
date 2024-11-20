import ForgotPasswordView from 'src/sections/auth/forgot-password-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Forgot Password - RENTS.ma | Reset Your Account Password',
    description: 'Reset your RENTS.ma account password easily. Enter your email to receive password recovery instructions.',
    keywords: 'Forgot password, Reset password, RENTS.ma account recovery, Password recovery',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/auth/forgot-password',
      title: 'Forgot Password - RENTS.ma | Reset Your Account Password',
      description: 'Easily reset your RENTS.ma account password by following the recovery process.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an authentication-specific image if available
          width: 1200,
          height: 630,
          alt: 'Forgot Password - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Forgot Password - RENTS.ma | Reset Your Account Password',
      description: 'Follow the steps to recover your RENTS.ma account password.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an authentication-specific image if available
    },
    alternates: {
      canonical: 'https://rents.ma/en/auth/forgot-password',
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
            name: 'Forgot Password - RENTS.ma',
            url: 'https://rents.ma/en/auth/forgot-password',
            description: 'Reset your RENTS.ma account password easily and securely.',
            potentialAction: {
              "@type": "Action",
              name: "Reset Password",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/en/auth/forgot-password',
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
