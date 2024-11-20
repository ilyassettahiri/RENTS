import axios from 'axios';
import Script from 'next/script';

import PrivacyView from 'src/sections/privacy/privacy-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'سياسة الخصوصية - RENTS.ma | مسؤوليتنا حماية بياناتك',
    description: 'تعرف على كيفية تعامل RENTS.ma مع بياناتك بشفافية واهتمام. اقرأ سياسة الخصوصية الخاصة بنا لفهم حقوقك وممارساتنا.',
    keywords: 'سياسة الخصوصية, خصوصية RENTS.ma, التعامل مع البيانات, خصوصية المستخدم, سياسة منصة التأجير',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/privacy-policy',
      title: 'سياسة الخصوصية - RENTS.ma | مسؤوليتنا حماية بياناتك',
      description: 'فهم كيفية حماية RENTS.ma لبياناتك وحقوقك. الشفافية والاهتمام في صميم ممارساتنا.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة لسياسة الخصوصية إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'سياسة الخصوصية - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'سياسة الخصوصية - RENTS.ma | مسؤوليتنا حماية بياناتك',
      description: 'تعرف على كيفية تعامل RENTS.ma مع بياناتك الشخصية بعناية وشفافية.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة لسياسة الخصوصية إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/privacy-policy',
      languages: {
        en: 'https://rents.ma/en/privacy-policy',
        ar: 'https://rents.ma/ar/privacy-policy',
        fr: 'https://rents.ma/fr/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const termData = response.data;

    return (
      <>
        {/* البيانات المنظمة الخاصة بالصفحة */}
        <Script
          type="application/ld+json"
          id="privacy-policy-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'سياسة الخصوصية - RENTS.ma',
              url: 'https://rents.ma/ar/privacy-policy',
              description: 'تعرف على كيفية تعامل RENTS.ma مع بياناتك الشخصية بشفافية واهتمام.',
            }),
          }}
        />
        {/* عرض محتوى سياسة الخصوصية */}
        <PrivacyView termData={termData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);

    return <PrivacyView termData={null} />;
  }
}
