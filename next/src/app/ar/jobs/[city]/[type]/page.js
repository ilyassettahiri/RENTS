import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `${type} وظائف في ${city} - فرص العمل على RENTS.ma`,
    description: `ابحث عن أفضل فرص العمل في مجال ${type} في ${city} على RENTS.ma. تصفح الوظائف التي تتناسب مع مهاراتك وتواصل مع أصحاب العمل الموثوقين في ${city} لتطوير حياتك المهنية.`,
    keywords: `${type} وظائف في ${city}, قوائم وظائف ${type} في ${city}, فرص العمل في ${type} ${city}, وظائف ${type} في ${city}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/jobs/${city}/${type}`,
      title: `${type} وظائف في ${city} - فرص العمل على RENTS.ma`,
      description: `اكتشف أحدث فرص العمل في مجال ${type} في ${city} على RENTS.ma. اعثر على وظائف تتناسب مع مهاراتك وتواصل مع أصحاب العمل الموثوقين.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `${type} وظائف في ${city} - فرص العمل على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${type} وظائف في ${city} - فرص العمل على RENTS.ma`,
      description: `اكتشف أفضل فرص العمل في مجال ${type} في ${city} على RENTS.ma. اعثر على وظائف تتناسب مع مهاراتك وتواصل مع أصحاب العمل الموثوقين.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/jobs/${city}/${type}`,
      languages: {
        en: `https://rents.ma/en/jobs/${city}/${type}`,
        ar: `https://rents.ma/ar/jobs/${city}/${type}`,
        fr: `https://rents.ma/fr/jobs/${city}/${type}`,
      },
    },
  };
}

const JobsPageType = ({ params }) => {
  const { city, type } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالوظائف */}
      <Script
        type="application/ld+json"
        id="jobs-type-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${type} وظائف في ${city} - RENTS.ma`,
            url: `https://rents.ma/ar/jobs/${city}/${type}`,
            description: `اكتشف أفضل فرص العمل في مجال ${type} في ${city} على RENTS.ma. اعثر على وظائف تتناسب مع مهاراتك وتواصل مع أصحاب العمل الموثوقين.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} وظائف 1`,
                  url: `https://rents.ma/ar/jobs/${city}/${type}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} وظائف 2`,
                  url: `https://rents.ma/ar/jobs/${city}/${type}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} وظائف 3`,
                  url: `https://rents.ma/ar/jobs/${city}/${type}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى الوظائف حسب النوع */}
      <JobsListViewType params={params} />
    </>
  );
};

JobsPageType.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageType;
