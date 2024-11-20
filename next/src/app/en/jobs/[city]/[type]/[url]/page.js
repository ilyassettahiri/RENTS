
import axios from 'axios';
import Script from 'next/script';

import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `${type} Job in ${city} - Apply on RENTS.ma`,
    description: `Discover this ${type} job opportunity in ${city} on RENTS.ma. View all job details, requirements, and connect with the hiring company to take the next step in your career.`,
    keywords: `${type} job in ${city}, ${city} ${type} job opportunity, ${type} careers in ${city}, ${type} job details ${city}`,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://rents.ma/en/jobs/${city}/${type}/${params.url}`,
      title: `${type} Job in ${city} - Apply on RENTS.ma`,
      description: `View details for this ${type} job in ${city}. Discover requirements, job description, and connect with the hiring company.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a job-specific or generic image
          width: 1200,
          height: 630,
          alt: `${type} Job in ${city} - Apply on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${type} Job in ${city} - Apply on RENTS.ma`,
      description: `Discover this ${type} job opportunity in ${city} on RENTS.ma. View all job details, requirements, and connect with the hiring company.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a job-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/jobs/${city}/${type}/${params.url}`,
      languages: {
        en: `https://rents.ma/en/jobs/${city}/${type}/${params.url}`,
        ar: `https://rents.ma/ar/jobs/${city}/${type}/${params.url}`,
        fr: `https://rents.ma/fr/jobs/${city}/${type}/${params.url}`,
      },
    },
  };
}







export default async function JobPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const jobEndpoint = `${API_URL}/jobs/${params.url}`;
  const { city, type, url } = params;

  try {
    // Fetch job data server-side
    const response = await axios.get(jobEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const jobData = response.data;

    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="job-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: `${type} Job in ${city}`,
              description: jobData.description || `Discover this ${type} job opportunity in ${city}.`,
              employmentType: jobData.employmentType || 'Full-time',
              datePosted: jobData.datePosted || new Date().toISOString(),
              validThrough: jobData.validThrough || null,
              hiringOrganization: {
                "@type": "Organization",
                name: jobData.companyName || 'Unknown Company',
                sameAs: jobData.companyWebsite || null,
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city,
                  addressCountry: 'Morocco',
                },
              },
              baseSalary: jobData.salary || 'Not specified',
            }),
          }}
        />
        <JobPageView params={params} jobData={jobData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching job data:', error);

    // Pass null to JobPageView in case of an error
    return <JobPageView params={params} jobData={null} />;
  }
}

JobPage.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
