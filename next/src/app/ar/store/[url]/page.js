import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `متجر ${url} - RENTS.ma | اكتشف أعمالاً موثوقة`,
    description: `استكشف متجر ${url} على RENTS.ma. اكتشف تأجيرات موثوقة للسيارات والعقارات والمعدات والمزيد.`,
    keywords: `متجر ${url}, أعمال موثوقة, خدمات التأجير, تأجيرات ${url}`,
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/store/${url}`,
      title: `متجر ${url} - RENTS.ma | اكتشف أعمالاً موثوقة`,
      description: `استكشف متجر ${url} على RENTS.ma. اكتشف تأجيرات موثوقة للسيارات والعقارات والمعدات والمزيد.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمتجر إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `متجر ${url} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `متجر ${url} - RENTS.ma | اكتشف أعمالاً موثوقة`,
      description: `اكتشف التأجيرات والخدمات الموثوقة في متجر ${url} على RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمتجر إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/store/${url}`,
      languages: {
        en: `https://rents.ma/en/store/${url}`,
        ar: `https://rents.ma/ar/store/${url}`,
        fr: `https://rents.ma/fr/store/${url}`,
      },
    },
  };
}

const EcommerceLandingPage = ({ params }) => {
  const { url } = params;

  return (
    <>
      {/* بيانات منظمة خاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="store-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `متجر ${url} - RENTS.ma`,
            url: `https://rents.ma/ar/store/${url}`,
            description: `اكتشف التأجيرات والخدمات الموثوقة في متجر ${url} على RENTS.ma.`,
          }),
        }}
      />
      {/* عرض محتوى المتجر */}
      <StoreView params={params} />
    </>
  );
};

EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
