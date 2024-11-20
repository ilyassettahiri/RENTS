
import axios from 'axios';
import Script from 'next/script';

import HomeView from 'src/sections/home/home-view';

// ----------------------------------------------------------------------



export const metadata = {
  title: 'RENTS.ma: اكتشف السوق الرائد للإيجارات في المغرب - سيارات، دراجات، عقارات والمزيد',
  description: 'استكشف RENTS.ma، السوق الرائد للإيجارات في المغرب، مع خيارات متنوعة تشمل السيارات، الدراجات، العقارات، والمعدات. ابحث عن إيجارات موثوقة بشروط مرنة في مدن المغرب الشهيرة مثل مراكش والدار البيضاء.',

  keywords: 'إيجارات في المغرب, إيجار سيارات, إيجار عقارات, إيجار دراجات, إيجار معدات, إيجارات مراكش, إيجارات الدار البيضاء',
  openGraph: {
    type: 'website',
    locale: 'ar_MA',
    url: 'https://rents.ma/ar',
    title: 'RENTS.ma - أفضل سوق للإيجارات في المغرب',
    description: 'ابحث عن خيارات إيجار موثوقة للسيارات، الدراجات، العقارات، والمعدات في المغرب.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // صورة عالية الجودة لـ Open Graph
        width: 512,
        height: 512,
        alt: 'RENTS.ma - اكتشف السوق الرائد للإيجارات في المغرب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RENTS.ma - أفضل سوق للإيجارات في المغرب',
    description: 'اكتشف RENTS.ma، وجهتك المثالية لخدمات الإيجار الموثوقة في المغرب.',
    image: '/favicon/android-chrome-512x512.png', // صورة خاصة بـ Twitter
  },
  alternates: {
    canonical: 'https://rents.ma/ar',
    languages: {
      en: 'https://rents.ma/en',
      ar: 'https://rents.ma/ar',
      fr: 'https://rents.ma/fr',
    },
  },
};

export default async function HomePage() {






  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const homeEndpoint = `${API_URL}/home`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(homeEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const homeData = response.data;




    return (
      <>
        <Script
          type="application/ld+json"
          id="homepage-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "الرئيسية - RENTS.ma",
              url: "https://rents.ma/ar",
              description:
                "اكتشف السوق الرائد للإيجارات في المغرب. ابحث عن سيارات، دراجات، عقارات، ومعدات للإيجار في مدن مثل مراكش والدار البيضاء.",
            }),
          }}
        />
        <HomeView homeData={homeData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching homeData:', error);


    return <HomeView homeData={null} />;
  }




}
