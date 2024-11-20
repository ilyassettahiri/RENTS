import ComingSoonView from 'src/sections/status/coming-soon-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'قريباً - RENTS.ma | تحديثات مثيرة قادمة',
    description: 'ترقبوا التحديثات المثيرة من RENTS.ma. ميزاتنا وخدماتنا الجديدة قادمة قريباً!',
    keywords: 'قريباً, تحديثات RENTS.ma, ميزات جديدة RENTS.ma, تحديثات خدمات الإيجار',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/coming-soon',
      title: 'قريباً - RENTS.ma | تحديثات مثيرة قادمة',
      description: 'اكتشف أحدث الميزات والتحديثات القادمة إلى RENTS.ma. ترقب المزيد!',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'قريباً - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'قريباً - RENTS.ma | تحديثات مثيرة قادمة',
      description: 'ابقَ مطلعاً على ما هو قادم في RENTS.ma. ميزات وخدمات جديدة في الطريق!',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/coming-soon',
      languages: {
        en: 'https://rents.ma/en/coming-soon',
        ar: 'https://rents.ma/ar/coming-soon',
        fr: 'https://rents.ma/fr/coming-soon',
      },
    },
  };
}

export default function ComingSoonPage() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="coming-soon-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'قريباً - RENTS.ma',
            url: 'https://rents.ma/ar/coming-soon',
            description: 'ترقبوا أحدث التحديثات والميزات القادمة إلى RENTS.ma.',
            potentialAction: {
              "@type": "InformAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/ar/coming-soon',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* عرض محتوى قريباً */}
      <ComingSoonView />
    </>
  );
}
