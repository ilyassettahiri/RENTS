import JobsListViewCity from 'src/sections/jobs-list/jobs-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Jobs in ${city} - Find Employment Opportunities on RENTS.ma`,
    description: `Explore the latest job opportunities in ${city} on RENTS.ma. Discover positions across various industries and connect with top employers in ${city}. Start your job search today!`,
    keywords: `Jobs in ${city}, Employment opportunities in ${city}, Careers in ${city}, ${city} job listings`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/jobs/${city}`,
      title: `Jobs in ${city} - Find Employment Opportunities on RENTS.ma`,
      description: `Discover top job opportunities in ${city}. Explore various industries and connect with trusted employers on RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
          width: 1200,
          height: 630,
          alt: `Jobs in ${city} - Find Employment Opportunities on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Jobs in ${city} - Find Employment Opportunities on RENTS.ma`,
      description: `Explore job opportunities in ${city}. Discover positions across various industries and connect with top employers.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/jobs/${city}`,
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
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-city-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Jobs in ${city} - RENTS.ma`,
            url: `https://rents.ma/en/jobs/${city}`,
            description: `Find job opportunities in ${city} across various industries. Connect with top employers and discover your next career step.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Software Developer Jobs',
                  url: `https://rents.ma/en/jobs/${city}/software-developer`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Marketing Jobs',
                  url: `https://rents.ma/en/jobs/${city}/marketing`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Sales Jobs',
                  url: `https://rents.ma/en/jobs/${city}/sales`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render City-Specific Jobs Content */}
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
