import RegisterView from 'src/sections/auth/register-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'إنشاء حساب - RENTS.ma | ابدأ الآن',
    description: 'قم بإنشاء حسابك على RENTS.ma وابدأ في استكشاف أفضل منصة للإيجارات في المغرب. انضم إلى المستأجرين والمزودين اليوم!',
    keywords: 'إنشاء حساب, التسجيل في RENTS.ma, فتح حساب, منصة الإيجارات, انضم إلى RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/auth/register',
      title: 'إنشاء حساب - RENTS.ma | ابدأ الآن',
      description: 'سجل على RENTS.ma للوصول إلى الإيجارات الموثوقة في المغرب للسيارات والعقارات والمزيد. ابدأ الآن في التأجير أو إضافة الإعلانات!',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للتسجيل إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'إنشاء حساب - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'إنشاء حساب - RENTS.ma | ابدأ الآن',
      description: 'انضم اليوم إلى RENTS.ma واستفد من أفضل منصة للإيجارات في المغرب.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للتسجيل إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/auth/register',
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
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="register-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'إنشاء حساب - RENTS.ma',
            url: 'https://rents.ma/ar/auth/register',
            description: 'قم بإنشاء حسابك على RENTS.ma لاستكشاف وإدارة الإيجارات. ابدأ اليوم في التأجير أو إضافة الإعلانات في المغرب.',
            potentialAction: {
              "@type": "RegisterAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/ar/auth/register',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* عرض محتوى التسجيل */}
      <RegisterView />
    </>
  );
}
