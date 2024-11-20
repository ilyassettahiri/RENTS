import axios from 'axios';
import Script from 'next/script';

import ServicePageView from 'src/sections/service-page/service-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type, url } = params;

  return {
    title: `توظيف ${type} في ${city} - خدمات موثوقة على RENTS.ma`,
    description: `اكتشف جميع تفاصيل خدمات ${type} في ${city}. تواصل مع مقدمي الخدمات الموثوقين على RENTS.ma للحصول على خدمات موثوقة ومحترفة.`,
    keywords: `${type} في ${city}, توظيف ${type} في ${city}, خدمات ${type} موثوقة ${city}, محترفو ${type} ${city}, ${type} على RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/services/${city}/${type}/${url}`,
      title: `توظيف ${type} في ${city} - خدمات موثوقة على RENTS.ma`,
      description: `اكتشف خدمات ${type} موثوقة في ${city}. اعرف التفاصيل وتواصل مع المحترفين على RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع أو صورة عامة
          width: 1200,
          height: 630,
          alt: `توظيف ${type} في ${city} - خدمات موثوقة على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `توظيف ${type} في ${city} - خدمات موثوقة على RENTS.ma`,
      description: `اكتشف خدمات ${type} موثوقة في ${city}. اعرف التفاصيل وتواصل مع المحترفين على RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالنوع أو صورة عامة
    },
    alternates: {
      canonical: `https://rents.ma/ar/services/${city}/${type}/${url}`,
      languages: {
        en: `https://rents.ma/en/services/${city}/${type}/${url}`,
        ar: `https://rents.ma/ar/services/${city}/${type}/${url}`,
        fr: `https://rents.ma/fr/services/${city}/${type}/${url}`,
      },
    },
  };
}

export default async function ServicePage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const serviceEndpoint = `${API_URL}/services/${params.url}`;
  const { city, type, url } = params;

  try {
    // Fetch service data server-side
    const response = await axios.get(serviceEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const serviceData = response.data;

    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="service-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${type} في ${city}`,
              description: `تفاصيل عن خدمات ${type} في ${city}. تواصل مع مقدمي الخدمات الموثوقين على RENTS.ma.`,
              provider: {
                "@type": "Organization",
                name: "RENTS.ma",
                url: "https://rents.ma",
              },
              areaServed: city,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rents.ma/ar/services/${city}/${type}/${url}`,
              },
            }),
          }}
        />
        <ServicePageView params={params} serviceData={serviceData} />
      </>
    );

  } catch (error) {
    console.error('Error fetching service data:', error);

    // Pass null to ServicePageView in case of an error
    return <ServicePageView params={params} serviceData={null} />;
  }
}

ServicePage.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
