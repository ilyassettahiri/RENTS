import LoginView from 'src/sections/auth/login-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'تسجيل الدخول - RENTS.ma | الوصول إلى حسابك',
    description: 'قم بتسجيل الدخول إلى حسابك على RENTS.ma لاستكشاف وإدارة الإيجارات. وصول آمن للمستأجرين والمزودين.',
    keywords: 'تسجيل الدخول, حساب RENTS.ma, الوصول إلى RENTS.ma, إدارة الإيجارات, تسجيل دخول آمن',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/auth/login',
      title: 'تسجيل الدخول - RENTS.ma | الوصول إلى حسابك',
      description: 'قم بتسجيل الدخول إلى حسابك على RENTS.ma بأمان واستكشف منصة الإيجارات الرائدة في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'تسجيل الدخول - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'تسجيل الدخول - RENTS.ma | الوصول إلى حسابك',
      description: 'قم بتسجيل الدخول إلى حسابك على RENTS.ma بأمان واستكشف منصة الإيجارات الرائدة في المغرب.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/auth/login',
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
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="login-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'تسجيل الدخول - RENTS.ma',
            url: 'https://rents.ma/ar/auth/login',
            description: 'قم بتسجيل الدخول إلى حسابك على RENTS.ma بأمان لإدارة الإيجارات واستكشاف المنصة.',
            potentialAction: {
              "@type": "LoginAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/ar/auth/login',
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
      {/* عرض محتوى تسجيل الدخول */}
      <LoginView />
    </>
  );

}
