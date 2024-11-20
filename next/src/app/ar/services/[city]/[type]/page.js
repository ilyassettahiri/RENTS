import ServicesListViewType from 'src/sections/services-list/services-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `توظيف خدمات مهنية ${type} في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
    description: `هل تحتاج إلى خدمات ${type} موثوقة في ${city}؟ يربطك RENTS.ma مع محترفين موثوقين جاهزين لتلبية احتياجاتك.`,
    keywords: `خدمات ${type} مهنية في ${city}, خدمات ${type} ${city}, مقدمو خدمات ${type} موثوقون ${city}, توظيف ${type} في ${city}, ${type} على RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/services/${city}/${type}`,
      title: `توظيف خدمات مهنية ${type} في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
      description: `ابحث عن خدمات ${type} موثوقة في ${city} على RENTS.ma. تواصل مع محترفين مهرة لتلبية احتياجاتك.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع أو صورة عامة
          width: 1200,
          height: 630,
          alt: `توظيف خدمات مهنية ${type} في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `توظيف خدمات مهنية ${type} في ${city} - مقدمو خدمات موثوقون على RENTS.ma`,
      description: `ابحث عن خدمات ${type} موثوقة في ${city} على RENTS.ma. تواصل مع محترفين مهرة لتلبية احتياجاتك.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع أو صورة عامة
    },
    alternates: {
      canonical: `https://rents.ma/ar/services/${city}/${type}`,
      languages: {
        en: `https://rents.ma/en/services/${city}/${type}`,
        ar: `https://rents.ma/ar/services/${city}/${type}`,
        fr: `https://rents.ma/fr/services/${city}/${type}`,
      },
    },
  };
}

const ServicesPageType = ({ params }) => {
  const { city, type } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-type-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `خدمات ${type} في ${city} | RENTS.ma`,
            url: `https://rents.ma/ar/services/${city}/${type}`,
            description: `ابحث عن خدمات ${type} موثوقة في ${city} على RENTS.ma. تواصل مع محترفين مهرة لتلبية احتياجاتك.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} الخدمة 1`,
                  url: `https://rents.ma/ar/services/${city}/${type}/service1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} الخدمة 2`,
                  url: `https://rents.ma/ar/services/${city}/${type}/service2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} الخدمة 3`,
                  url: `https://rents.ma/ar/services/${city}/${type}/service3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Content */}
      <ServicesListViewType params={params} />
    </>
  );
};

ServicesPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageType;
