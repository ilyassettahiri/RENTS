import axios from 'axios';
import Script from 'next/script';
import { cookies } from 'next/headers';

import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';

export async function generateMetadata({ params }) {
  const { category, type, city, url } = params;

  return {
    title: `أفضل ${category} للإيجار في ${city} - ${type} متوفر | RENTS.ma`,
    description: `اكتشف هذا العرض الحصري لـ ${category} (${type}) للإيجار في ${city}. استعرض التفاصيل، الأسعار، واتصل بالمزودين الموثوقين عبر RENTS.ma.`,
    keywords: `${category} للإيجار في ${city}, ${city} ${category} للإيجار, أفضل ${type} في ${city}, مزودين موثوقين ${type} في ${city}`,
    openGraph: {
      type: 'article',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
      title: `أفضل ${category} للإيجار في ${city} - ${type} متوفر | RENTS.ma`,
      description: `اكتشف عروض ${category} (${type}) للإيجار في ${city}. استعرض التفاصيل واتصل بالمزودين الموثوقين.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالقائمة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `أفضل ${category} للإيجار في ${city} - ${type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `أفضل ${category} للإيجار في ${city} - ${type} متوفر | RENTS.ma`,
      description: `اكتشف هذا العرض الحصري لـ ${category} (${type}) للإيجار في ${city}. استعرض التفاصيل واتصل بالمزودين الموثوقين.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالقائمة إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
        ar: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
        fr: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
      },
    },
  };
}

export default async function ListingPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const listingEndpoint = `${API_URL}/listings/${params.category}/${params.url}`;
  const { city, category, type, url } = params;

  const authToken = cookies().get('authToken')?.value;


  try {
    // Fetch job data server-side
    const response = await axios.get(listingEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    });

    const listingData = response.data;

    return (
      <>
        {/* بيانات منظمة خاصة بالقائمة */}
        <Script
          type="application/ld+json"
          id="listing-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${category} للإيجار - ${type} في ${city}`,
              url: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
              description: `اكتشف هذا العرض الحصري لـ ${category} (${type}) للإيجار في ${city} عبر RENTS.ma.`,
              brand: {
                "@type": "Brand",
                name: "RENTS.ma",
              },
              offers: {
                "@type": "Offer",
                url: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
                priceCurrency: "MAD", // استبدل بالعملة الفعلية إذا لزم الأمر
                price: listingData.data?.attributes?.price || "اتصل للسعر",
                availability: "http://schema.org/InStock",
              },
            }),
          }}
        />
        {/* عرض محتوى القائمة */}
        <ListingView params={params} listingData={listingData} />
      </>
    );

  } catch (error) {
    console.error('Error fetching Listing data:', error);

    return <ListingView params={params} listingData={null} />;
  }
}

ListingPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};
