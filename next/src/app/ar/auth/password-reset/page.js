import PasswordResetView from 'src/sections/auth/password-reset-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'تأكيد حسابك - RENTS.ma | ضمان الوصول الآمن',
    description: 'قم بتأكيد حسابك على RENTS.ma لضمان وصول آمن إلى أكبر منصة للإيجارات في المغرب. أكمل تسجيلك اليوم!',
    keywords: 'تأكيد الحساب, تأكيد حساب RENTS.ma, تسجيل دخول آمن, التحقق من الوصول RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/auth/verify',
      title: 'تأكيد حسابك - RENTS.ma | ضمان الوصول الآمن',
      description: 'أكمل عملية التحقق من حسابك على RENTS.ma وابدأ في الوصول إلى خدمات الإيجار الموثوقة في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للتحقق إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'تأكيد حسابك - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'تأكيد حسابك - RENTS.ma | ضمان الوصول الآمن',
      description: 'قم بضمان الوصول الآمن إلى حسابك على RENTS.ma من خلال إكمال عملية التحقق.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للتحقق إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/auth/verify',
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
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="verify-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'تأكيد حسابك - RENTS.ma',
            url: 'https://rents.ma/ar/auth/verify',
            description: 'قم بضمان الوصول الآمن إلى حسابك على RENTS.ma من خلال إكمال عملية التحقق.',
            potentialAction: {
              "@type": "VerifyAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/ar/auth/verify',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* عرض محتوى التحقق */}
      <PasswordResetView />
    </>
  );
}
