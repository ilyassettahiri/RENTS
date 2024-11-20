import JobsListViewCity from 'src/sections/jobs-list/jobs-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `وظائف في ${city} - ابحث عن فرص العمل على RENTS.ma`,
    description: `استكشف أحدث فرص العمل في ${city} على RENTS.ma. اكتشف الوظائف في صناعات مختلفة وتواصل مع أفضل أصحاب العمل في ${city}. ابدأ بحثك عن وظيفة اليوم!`,
    keywords: `وظائف في ${city}, فرص العمل في ${city}, وظائف في ${city}, قوائم وظائف في ${city}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/jobs/${city}`,
      title: `وظائف في ${city} - ابحث عن فرص العمل على RENTS.ma`,
      description: `اكتشف أفضل فرص العمل في ${city}. استكشف صناعات مختلفة وتواصل مع أفضل أصحاب العمل على RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `وظائف في ${city} - ابحث عن فرص العمل على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `وظائف في ${city} - ابحث عن فرص العمل على RENTS.ma`,
      description: `استكشف فرص العمل في ${city}. اكتشف الوظائف في صناعات متنوعة وتواصل مع أفضل أصحاب العمل.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/jobs/${city}`,
      languages: {
        en: `https://rents.ma/en/jobs/${city}`,
        ar: `https://rents.ma/ar/jobs/${city}`,
        fr: `https://rents.ma/fr/jobs/${city}`,
      },
    },
  };
}

const JobsPageCity = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالوظائف */}
      <Script
        type="application/ld+json"
        id="jobs-city-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `وظائف في ${city} - RENTS.ma`,
            url: `https://rents.ma/ar/jobs/${city}`,
            description: `اكتشف فرص العمل في ${city} عبر صناعات متنوعة. تواصل مع أفضل أصحاب العمل واكتشف خطوتك المهنية التالية.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'وظائف مطوري البرمجيات',
                  url: `https://rents.ma/ar/jobs/${city}/software-developer`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'وظائف التسويق',
                  url: `https://rents.ma/ar/jobs/${city}/marketing`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'وظائف المبيعات',
                  url: `https://rents.ma/ar/jobs/${city}/sales`,
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى الوظائف في المدينة */}
      <JobsListViewCity params={params} />
    </>
  );
};

JobsPageCity.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageCity;
