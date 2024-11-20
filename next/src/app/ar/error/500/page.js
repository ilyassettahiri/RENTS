import View500 from 'src/sections/error/500-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'خطأ داخلي في الخادم 500 - RENTS.ma',
    description: 'حدث خطأ في الخادم. يرجى إعادة تحميل الصفحة أو العودة إلى الصفحة الرئيسية لموقع RENTS.ma.',
    keywords: 'خطأ 500, خطأ داخلي في الخادم, خطأ خادم RENTS.ma, مشكلة منصة الإيجار',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/500',
      title: 'خطأ داخلي في الخادم 500 - RENTS.ma',
      description: 'واجهنا مشكلة في خادمنا. يرجى إعادة تحميل الصفحة أو زيارة الصفحة الرئيسية للاستمرار في استكشاف RENTS.ma.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'خطأ داخلي في الخادم 500 - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'خطأ داخلي في الخادم 500 - RENTS.ma',
      description: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا أو العودة إلى الصفحة الرئيسية.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/500',
      languages: {
        en: 'https://rents.ma/en/500',
        ar: 'https://rents.ma/ar/500',
        fr: 'https://rents.ma/fr/500',
      },
    },
  };
}

export default function Page500() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="500-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'خطأ داخلي في الخادم 500 - RENTS.ma',
            url: 'https://rents.ma/ar/500',
            description: 'حدث خطأ في الخادم على RENTS.ma. يرجى إعادة تحميل الصفحة أو زيارة الصفحة الرئيسية للاستمرار في استكشاف الموقع.',
          }),
        }}
      />
      {/* عرض محتوى صفحة 500 */}
      <View500 />
    </>
  );
}
