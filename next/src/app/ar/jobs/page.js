import JobsView from 'src/sections/jobs-list/jobs-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'وظائف في المغرب - ابحث عن فرص عمل على RENTS.ma',
    description:
      'استكشف مجموعة واسعة من فرص العمل عبر المغرب على RENTS.ma. اكتشف الوظائف في صناعات مختلفة وتواصل مع أفضل أصحاب العمل في جميع أنحاء البلاد. ابدأ بحثك عن وظيفة اليوم!',
    keywords: 'وظائف في المغرب, التوظيف في المغرب, فرص العمل, صناعات المغرب, وظائف على RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/jobs',
      title: 'وظائف في المغرب - ابحث عن فرص عمل على RENTS.ma',
      description:
        'اكتشف أحدث فرص العمل في المغرب. ابحث عن وظائف في صناعات متنوعة وتواصل مع أفضل أصحاب العمل.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'وظائف في المغرب - ابحث عن فرص عمل على RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'وظائف في المغرب - ابحث عن فرص عمل على RENTS.ma',
      description:
        'استكشف فرص العمل في المغرب. تواصل مع أفضل أصحاب العمل وابدأ رحلتك المهنية مع RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/jobs',
      languages: {
        en: 'https://rents.ma/en/jobs',
        ar: 'https://rents.ma/ar/jobs',
        fr: 'https://rents.ma/fr/jobs',
      },
    },
  };
}

export default function JobsPage() {
  return (
    <>
      {/* بيانات منظمة خاصة بالوظائف */}
      <Script
        type="application/ld+json"
        id="jobs-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'وظائف في المغرب - RENTS.ma',
            url: 'https://rents.ma/ar/jobs',
            description:
              'استكشف مجموعة واسعة من فرص العمل في المغرب. اكتشف الوظائف في صناعات متنوعة وتواصل مع أفضل أصحاب العمل.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'وظائف مطوري البرمجيات',
                  url: 'https://rents.ma/ar/jobs/software-developer',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'وظائف التسويق',
                  url: 'https://rents.ma/ar/jobs/marketing',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'وظائف المبيعات',
                  url: 'https://rents.ma/ar/jobs/sales',
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى الوظائف */}
      <JobsView />
    </>
  );
}
