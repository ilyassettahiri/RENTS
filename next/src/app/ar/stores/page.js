import BusinessListView from 'src/sections/business-list/business-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'المتاجر - RENTS.ma | اكتشف أعمالًا موثوقة في المغرب',
    description: 'استكشف أفضل المتاجر والأعمال على RENTS.ma. اعثر على مزودي خدمات تأجير موثوقين يقدمون السيارات والعقارات والمعدات والمزيد للإيجار في المغرب.',
    keywords: 'المتاجر في المغرب, متاجر RENTS.ma, أعمال التأجير, مزودون موثوقون, خدمات التأجير في المغرب',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/stores',
      title: 'المتاجر - RENTS.ma | اكتشف أعمالًا موثوقة في المغرب',
      description: 'اكتشف الأعمال الموثوقة على RENTS.ma. استكشف المتاجر التي تقدم تأجير السيارات والعقارات والمعدات والمزيد.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمتاجر إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'المتاجر - RENTS.ma | اكتشف أعمالًا موثوقة في المغرب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'المتاجر - RENTS.ma | اكتشف أعمالًا موثوقة في المغرب',
      description: 'استكشف أفضل المتاجر والأعمال على RENTS.ma. اعثر على مزودي خدمات تأجير موثوقين يقدمون السيارات والعقارات والمعدات والمزيد للإيجار في المغرب.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمتاجر إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/stores',
      languages: {
        en: 'https://rents.ma/en/stores',
        ar: 'https://rents.ma/ar/stores',
        fr: 'https://rents.ma/fr/stores',
      },
    },
  };
}

export default function BusinessListPage() {
  return (
    <>
      {/* بيانات منظمة خاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="stores-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'المتاجر - RENTS.ma',
            url: 'https://rents.ma/ar/stores',
            description: 'استكشف الأعمال الموثوقة التي تقدم خدمات التأجير على RENTS.ma. اكتشف السيارات والعقارات والمعدات والمزيد.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'متجر تأجير السيارات',
                  url: 'https://rents.ma/ar/stores/cars',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'متجر تأجير العقارات',
                  url: 'https://rents.ma/ar/stores/properties',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'متجر تأجير المعدات',
                  url: 'https://rents.ma/ar/stores/equipment',
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى المتاجر */}
      <BusinessListView />
    </>
  );
}
