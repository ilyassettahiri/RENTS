import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `توظيف خدمات مهنية في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
    description: `ابحث عن محترفين مهرة للعمل في ${city} على RENTS.ma. تواصل مع مقدمي الخدمات الموثوقين الذين يقدمون مجموعة واسعة من الخدمات لتلبية احتياجاتك. استكشف أفضل الخيارات في ${city} اليوم!`,
    keywords: `الخدمات المهنية في ${city}, توظيف محترفين مهرة في ${city}, مقدمو الخدمات في ${city}, خدمات موثوقة في ${city}, خدمات في ${city} على RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/services/${city}`,
      title: `توظيف خدمات مهنية في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
      description: `ابحث عن محترفين مهرة موثوقين يقدمون خدمات في ${city}. اكتشف أفضل مقدمي الخدمات في RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالمدينة أو صورة عامة
          width: 1200,
          height: 630,
          alt: `توظيف خدمات مهنية في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `توظيف خدمات مهنية في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
      description: `ابحث عن محترفين مهرة موثوقين يقدمون خدمات في ${city}. اكتشف أفضل مقدمي الخدمات في RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالمدينة أو صورة عامة
    },
    alternates: {
      canonical: `https://rents.ma/ar/services/${city}`,
      languages: {
        en: `https://rents.ma/en/services/${city}`,
        ar: `https://rents.ma/ar/services/${city}`,
        fr: `https://rents.ma/fr/services/${city}`,
      },
    },
  };
}

const ServicesPageCity = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-city-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `الخدمات المهنية في ${city} | RENTS.ma`,
            url: `https://rents.ma/ar/services/${city}`,
            description: `استكشف خدمات مهنية موثوقة في ${city}. تواصل مع مقدمي الخدمات المهرة لتلبية احتياجاتك.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'خدمات صيانة المنزل',
                  url: `https://rents.ma/ar/services/${city}/home-maintenance`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'خدمات العناية الشخصية',
                  url: `https://rents.ma/ar/services/${city}/personal-care`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'خدمات التنظيف',
                  url: `https://rents.ma/ar/services/${city}/cleaning`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Services-Specific Content */}
      <ServicesListViewCity params={params} />
    </>
  );
};

ServicesPageCity.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageCity;
