import ForgotPasswordView from 'src/sections/auth/forgot-password-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'نسيت كلمة المرور - RENTS.ma | إعادة تعيين كلمة مرور الحساب',
    description: 'قم بإعادة تعيين كلمة مرور حسابك على RENTS.ma بسهولة. أدخل بريدك الإلكتروني لتلقي تعليمات استعادة كلمة المرور.',
    keywords: 'نسيت كلمة المرور, إعادة تعيين كلمة المرور, استعادة حساب RENTS.ma, استعادة كلمة المرور',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/auth/forgot-password',
      title: 'نسيت كلمة المرور - RENTS.ma | إعادة تعيين كلمة مرور الحساب',
      description: 'قم بإعادة تعيين كلمة مرور حسابك على RENTS.ma بسهولة باتباع خطوات الاستعادة.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'نسيت كلمة المرور - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'نسيت كلمة المرور - RENTS.ma | إعادة تعيين كلمة مرور الحساب',
      description: 'اتبع الخطوات لاستعادة كلمة مرور حسابك على RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/auth/forgot-password',
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
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="forgot-password-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'نسيت كلمة المرور - RENTS.ma',
            url: 'https://rents.ma/ar/auth/forgot-password',
            description: 'قم بإعادة تعيين كلمة مرور حسابك على RENTS.ma بسهولة وأمان.',
            potentialAction: {
              "@type": "Action",
              name: "إعادة تعيين كلمة المرور",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/ar/auth/forgot-password',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* عرض محتوى صفحة نسيت كلمة المرور */}
      <ForgotPasswordView />
    </>
  );


}
