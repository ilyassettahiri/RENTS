import axios from 'axios';
import Script from 'next/script';

import FaqsView from 'src/sections/faqs/faqs-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'الأسئلة الشائعة - RENTS.ma | مركز المساعدة للإيجارات في المغرب',
    description: 'اعثر على إجابات على الأسئلة الشائعة حول RENTS.ma. احصل على المساعدة بشأن الإيجارات، الإعلانات، وأكثر في المغرب.',
    keywords: 'الأسئلة الشائعة, مساعدة RENTS.ma, أسئلة حول الإيجارات, منصة الإيجار في المغرب',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/faqs',
      title: 'الأسئلة الشائعة - RENTS.ma | مركز المساعدة للإيجارات في المغرب',
      description: 'اكتشف الأسئلة الشائعة حول RENTS.ma لتجد إجابات على استفساراتك حول استئجار السيارات، العقارات، والمعدات في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'الأسئلة الشائعة - RENTS.ma | مركز المساعدة للإيجارات في المغرب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'الأسئلة الشائعة - RENTS.ma | مركز المساعدة للإيجارات في المغرب',
      description: 'احصل على إجابات على الأسئلة الشائعة حول إيجارات RENTS.ma والإعلانات والمزيد.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/faqs',
      languages: {
        en: 'https://rents.ma/en/faqs',
        ar: 'https://rents.ma/ar/faqs',
        fr: 'https://rents.ma/fr/faqs',
      },
    },
  };
}

export default async function FaqsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const faqDatasEndpoint = `${API_URL}/faqs`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(faqDatasEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const faqData = response.data;

    return (
      <>
        {/* البيانات المنظمة الخاصة بالصفحة */}
        <Script
          type="application/ld+json"
          id="faqs-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        {/* عرض محتوى الأسئلة الشائعة */}
        <FaqsView faqData={faqData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching FAQ data:', error);

    return <FaqsView faqData={null} />;
  }
}
