import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `${type} Jobs in ${city} - Opportunities on RENTS.ma`,
    description: `Find top ${type} job openings in ${city} on RENTS.ma. Browse positions tailored to your skills and connect with reputable employers in ${city} to advance your career.`,
    keywords: `${type} jobs in ${city}, ${city} ${type} job listings, Careers in ${type} ${city}, ${type} employment opportunities in ${city}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/jobs/${city}/${type}`,
      title: `${type} Jobs in ${city} - Opportunities on RENTS.ma`,
      description: `Explore the latest ${type} job opportunities in ${city} on RENTS.ma. Find positions tailored to your skills and connect with top employers.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
          width: 1200,
          height: 630,
          alt: `${type} Jobs in ${city} - Opportunities on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${type} Jobs in ${city} - Opportunities on RENTS.ma`,
      description: `Find the best ${type} job opportunities in ${city}. Discover positions suited to your expertise and connect with trusted employers.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/jobs/${city}/${type}`,
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
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-type-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${type} Jobs in ${city} - RENTS.ma`,
            url: `https://rents.ma/en/jobs/${city}/${type}`,
            description: `Discover top ${type} job openings in ${city}. Find positions tailored to your skills and connect with trusted employers.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} Job Listing 1`,
                  url: `https://rents.ma/en/jobs/${city}/${type}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} Job Listing 2`,
                  url: `https://rents.ma/en/jobs/${city}/${type}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} Job Listing 3`,
                  url: `https://rents.ma/en/jobs/${city}/${type}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Jobs Content */}
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
