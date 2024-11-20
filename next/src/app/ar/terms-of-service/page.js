import axios from 'axios';
import Script from 'next/script';

import TermconditionView from 'src/sections/termcondition/termcondition-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'شروط الخدمة - RENTS.ma | سياسات منصة التأجير',
    description: 'اقرأ شروط الخدمة لاستخدام RENTS.ma. تعرّف على سياساتنا وقواعدنا وإرشاداتنا لتجربة سلسة.',
    keywords: 'شروط الخدمة, شروط RENTS.ma, قواعد منصة التأجير, سياسات الخدمة, إرشادات RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/terms-of-service',
      title: 'شروط الخدمة - RENTS.ma | سياسات منصة التأجير',
      description: 'تعرّف على الشروط والسياسات التي تحكم استخدام RENTS.ma، السوق الرائدة للتأجير في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة لشروط الخدمة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'شروط الخدمة - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'شروط الخدمة - RENTS.ma | سياسات منصة التأجير',
      description: 'تعرف على القواعد والإرشادات لاستخدام RENTS.ma. استكشف شروط الخدمة لتجربة سلسة.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة لشروط الخدمة إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/terms-of-service',
      languages: {
        en: 'https://rents.ma/en/terms-of-service',
        ar: 'https://rents.ma/ar/terms-of-service',
        fr: 'https://rents.ma/fr/terms-of-service',
      },
    },
  };
}

export default async function TermconditionPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const termData = response.data;

    return (
      <>
        {/* بيانات منظمة خاصة بالصفحة */}
        <Script
          type="application/ld+json"
          id="terms-of-service-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'شروط الخدمة - RENTS.ma',
              url: 'https://rents.ma/ar/terms-of-service',
              description: 'تعرّف على الشروط والسياسات لاستخدام RENTS.ma، السوق الرائدة للتأجير في المغرب.',
            }),
          }}
        />
        {/* عرض محتوى شروط الخدمة */}
        <TermconditionView termData={termData} />
      </>
    );
  } catch (error) {
    console.error('خطأ في تحميل شروط الخدمة:', error);

    return <TermconditionView termData={null} />;
  }
}
