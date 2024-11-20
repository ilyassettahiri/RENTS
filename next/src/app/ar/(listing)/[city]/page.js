import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `استكشاف الإيجارات في ${city} - سيارات، معدات، وأكثر | RENTS.ma`,
    description: `اكتشف أفضل خيارات الإيجار في ${city} مع RENTS.ma. استأجر سيارات، أدوات، إلكترونيات، وأكثر من مزودين موثوقين.`,
    keywords: `الإيجارات في ${city}, تأجير السيارات في ${city}, تأجير المعدات في ${city}, أدوات للإيجار في ${city}, تأجير الإلكترونيات في ${city}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/${city}`,
      title: `استكشاف الإيجارات في ${city} - سيارات، معدات، وأكثر | RENTS.ma`,
      description: `اكتشف أفضل خيارات الإيجار في ${city} مع RENTS.ma. استأجر سيارات، أدوات، إلكترونيات، وأكثر من مزودين موثوقين.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالمدينة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `استكشاف الإيجارات في ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `استكشاف الإيجارات في ${city} - سيارات، معدات، وأكثر | RENTS.ma`,
      description: `اكتشف أفضل خيارات الإيجار في ${city} مع RENTS.ma. استأجر سيارات، أدوات، إلكترونيات، وأكثر من مزودين موثوقين.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالمدينة إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/${city}`,
      languages: {
        en: `https://rents.ma/en/${city}`,
        ar: `https://rents.ma/ar/${city}`,
        fr: `https://rents.ma/fr/${city}`,
      },
    },
  };
}

const HomeCityPage = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالمدينة */}
      <Script
        type="application/ld+json"
        id="city-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `الإيجارات في ${city} | RENTS.ma`,
            url: `https://rents.ma/ar/${city}`,
            description: `استئجار سيارات، أدوات، إلكترونيات، وأكثر في ${city}. موفرون موثوقون على RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "سيارات للإيجار",
                  url: `https://rents.ma/ar/${city}/cars`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "أدوات للإيجار",
                  url: `https://rents.ma/ar/${city}/tools`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "إلكترونيات للإيجار",
                  url: `https://rents.ma/ar/${city}/electronics`,
                },
              ],
            },
          }),
        }}
      />
      {/* عرض المحتوى الخاص بالمدينة */}
      <HomeViewCity params={params} />
    </>
  );
};

HomeCityPage.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCityPage;
