import NotFoundView from 'src/sections/error/not-found-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: '404 الصفحة غير موجودة - RENTS.ma',
    description: 'الصفحة التي تبحث عنها غير موجودة على RENTS.ma. عد إلى الصفحة الرئيسية أو استكشف خدمات الإيجار لدينا.',
    keywords: 'خطأ 404, الصفحة غير موجودة, خطأ RENTS.ma, مشكلة منصة الإيجار',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/404',
      title: '404 الصفحة غير موجودة - RENTS.ma',
      description: 'عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها. عد إلى RENTS.ma واستكشف خدماتنا.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: '404 الصفحة غير موجودة - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '404 الصفحة غير موجودة - RENTS.ma',
      description: 'الصفحة التي تبحث عنها غير متاحة. عد إلى RENTS.ma واستكشف خدماتنا.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/404',
      languages: {
        en: 'https://rents.ma/en/404',
        ar: 'https://rents.ma/ar/404',
        fr: 'https://rents.ma/fr/404',
      },
    },
  };
}

export default function NotFoundPage() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="404-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: '404 الصفحة غير موجودة - RENTS.ma',
            url: 'https://rents.ma/ar/404',
            description: 'الصفحة المطلوبة غير موجودة على RENTS.ma. عد إلى الصفحة الرئيسية أو استكشف خدماتنا.',
          }),
        }}
      />
      {/* عرض محتوى صفحة 404 */}
      <NotFoundView />
    </>
  );
}
