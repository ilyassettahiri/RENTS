import HomeViewCategory from 'src/sections/home/home-view-category';
import PropTypes from 'prop-types';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { city, category } = params;

  return {
    title: `استئجار ${category} في ${city} - RENTS.ma`,
    description: `اكتشف أفضل خيارات تأجير ${category} في ${city} على RENTS.ma. من قوائم الجودة إلى المزودين الموثوقين، استأجر الآن بسهولة في ${city}.`,
    keywords: `تأجير ${category} في ${city}, ${category} للإيجار في ${city}, أفضل تأجير ${category} في ${city}, تأجير ${category} من مزودين موثوقين في ${city}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/${city}/${category}`,
      title: `استئجار ${category} في ${city} - RENTS.ma`,
      description: `اكتشف أفضل خيارات تأجير ${category} في ${city} على RENTS.ma. من قوائم الجودة إلى المزودين الموثوقين.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالفئة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `استئجار ${category} في ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `استئجار ${category} في ${city} - RENTS.ma`,
      description: `اكتشف أفضل خيارات تأجير ${category} في ${city} على RENTS.ma. من قوائم الجودة إلى المزودين الموثوقين، استأجر الآن بسهولة.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالفئة إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/${city}/${category}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}`,
        ar: `https://rents.ma/ar/${city}/${category}`,
        fr: `https://rents.ma/fr/${city}/${category}`,
      },
    },
  };
}

const HomeCategoryPage = ({ params }) => {
  const { city, category } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالفئة */}
      <Script
        type="application/ld+json"
        id="category-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `تأجير ${category} في ${city} | RENTS.ma`,
            url: `https://rents.ma/ar/${city}/${category}`,
            description: `اكتشف أفضل خيارات تأجير ${category} في ${city} على RENTS.ma. من قوائم الجودة إلى المزودين الموثوقين.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `قائمة ${category} 1`,
                  url: `https://rents.ma/ar/${city}/${category}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `قائمة ${category} 2`,
                  url: `https://rents.ma/ar/${city}/${category}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `قائمة ${category} 3`,
                  url: `https://rents.ma/ar/${city}/${category}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* عرض محتوى خاص بالفئة */}
      <HomeViewCategory params={params} />
    </>
  );
};

HomeCategoryPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomeCategoryPage;
