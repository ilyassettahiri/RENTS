
import axios from 'axios';
import Script from 'next/script';


import AboutView from 'src/sections/about/about-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'من نحن - RENTS.ma | اكتشف السوق الرائد للإيجارات في المغرب',
    description: 'تعرف على المزيد عن RENTS.ma، المنصة الرائدة للإيجارات في المغرب التي تربط المستخدمين بخدمات تأجير موثوقة للسيارات، العقارات، الدراجات، والمعدات.',
    keywords: 'عن RENTS.ma, منصة الإيجارات في المغرب, إيجار السيارات في المغرب, إيجار العقارات في المغرب, إيجار المعدات في المغرب',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/about',
      title: 'من نحن - RENTS.ma | اكتشف السوق الرائد للإيجارات في المغرب',
      description: 'اكتشف قصة RENTS.ma، السوق الرائد للإيجارات في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة عند الحاجة
          width: 1200,
          height: 630,
          alt: 'من نحن - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'من نحن - RENTS.ma | اكتشف السوق الرائد للإيجارات في المغرب',
      description: 'تعرف على المزيد عن RENTS.ma، المنصة الموثوقة التي تربط المستخدمين بخدمات الإيجارات في المغرب.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة عند الحاجة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/about',
      languages: {
        en: 'https://rents.ma/en/about',
        ar: 'https://rents.ma/ar/about',
        fr: 'https://rents.ma/fr/about',
      },
    },
  };
}

export default async function AboutPage() {





  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const aboutsEndpoint = `${API_URL}/abouts`;

  try {

    const response = await axios.get(aboutsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    const aboutData = response.data;



    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="about-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: 'عن RENTS.ma',
              url: 'https://rents.ma/ar/about',
              description: 'تعرف على المزيد عن RENTS.ma، المنصة الموثوقة للإيجارات في المغرب.',
              mainEntity: {
                "@type": "Organization",
                name: 'RENTS.ma',
                url: 'https://rents.ma',
                logo: 'https://rents.ma/favicon/android-chrome-192x192.png',
                sameAs: [
                  'https://facebook.com/rents.ma',
                  'https://instagram.com/rents.ma',
                  'https://twitter.com/rents_ma',
                ],
              },
            }),
          }}
        />
        <AboutView aboutData={aboutData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <AboutView aboutData={null} />;

  }


}
