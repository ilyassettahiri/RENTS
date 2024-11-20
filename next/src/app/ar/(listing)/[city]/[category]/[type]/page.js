import HomeViewType from 'src/sections/home/home-view-city';
import Script from 'next/script';
import PropTypes from 'prop-types';

export async function generateMetadata({ params }) {
  const { city, category, type } = params;

  return {
    title: `استئجار ${type} في ${city} - RENTS.ma`,
    description: `استكشف أفضل خيارات تأجير ${type} في ${city} على RENTS.ma. اعثر على أفضل العروض من مزودين موثوقين لتلبية احتياجاتك في ${city}.`,
    keywords: `${type} للإيجار في ${city}, ${city} ${type} للإيجار, أفضل ${type} للإيجار في ${city}, تأجير ${type} موثوق في ${city}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/${city}/${category}/${type}`,
      title: `استئجار ${type} في ${city} - RENTS.ma`,
      description: `استكشف عروض تأجير ${type} موثوقة في ${city}. اعثر على أفضل العروض من مزودين موثوقين على RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `استئجار ${type} في ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `استئجار ${type} في ${city} - RENTS.ma`,
      description: `اكتشف أفضل خيارات تأجير ${type} في ${city} على RENTS.ma. من قوائم الجودة إلى المزودين الموثوقين، اعثر على أفضل العروض المتاحة في ${city}.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/${city}/${category}/${type}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}/${type}`,
        ar: `https://rents.ma/ar/${city}/${category}/${type}`,
        fr: `https://rents.ma/fr/${city}/${category}/${type}`,
      },
    },
  };
}

const HomeTypePage = ({ params }) => {
  const { city, category, type } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالنوع */}
      <Script
        type="application/ld+json"
        id="type-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${type} للإيجار في ${city} | RENTS.ma`,
            url: `https://rents.ma/ar/${city}/${category}/${type}`,
            description: `استكشف أفضل عروض تأجير ${type} في ${city}. اكتشف قوائم موثوقة ومزودين على RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} العرض 1`,
                  url: `https://rents.ma/ar/${city}/${category}/${type}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} العرض 2`,
                  url: `https://rents.ma/ar/${city}/${category}/${type}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} العرض 3`,
                  url: `https://rents.ma/ar/${city}/${category}/${type}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى خاص بالنوع */}
      <HomeViewType params={params} />
    </>
  );
};

HomeTypePage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomeTypePage;
