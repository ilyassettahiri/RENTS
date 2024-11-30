import axios from 'axios';
import Script from 'next/script';
import { cookies } from 'next/headers';

import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `${type} وظيفة في ${city} - قدم الآن على RENTS.ma`,
    description: `اكتشف فرصة العمل ${type} في ${city} على RENTS.ma. شاهد جميع تفاصيل الوظيفة، المتطلبات، وتواصل مع الشركة المعلنة لتطوير مسيرتك المهنية.`,
    keywords: `${type} وظيفة في ${city}, فرصة عمل ${type} في ${city}, وظائف ${type} في ${city}, تفاصيل وظيفة ${type} في ${city}`,
    openGraph: {
      type: 'article',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/jobs/${city}/${type}/${params.url}`,
      title: `${type} وظيفة في ${city} - قدم الآن على RENTS.ma`,
      description: `شاهد تفاصيل وظيفة ${type} في ${city}. اكتشف المتطلبات، وصف الوظيفة، وتواصل مع الشركة المعلنة.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `${type} وظيفة في ${city} - قدم الآن على RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${type} وظيفة في ${city} - قدم الآن على RENTS.ma`,
      description: `اكتشف فرصة العمل ${type} في ${city} على RENTS.ma. شاهد جميع تفاصيل الوظيفة، المتطلبات، وتواصل مع الشركة المعلنة.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالوظائف إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/jobs/${city}/${type}/${params.url}`,
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

  const authToken = cookies().get('authToken')?.value;


  try {
    // Fetch job data server-side
    const response = await axios.get(jobEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
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
              title: `${type} وظيفة في ${city}`,
              description: jobData.description || `اكتشف فرصة العمل ${type} في ${city}.`,
              employmentType: jobData.employmentType || 'دوام كامل',
              datePosted: jobData.datePosted || new Date().toISOString(),
              validThrough: jobData.validThrough || null,
              hiringOrganization: {
                "@type": "Organization",
                name: jobData.companyName || 'شركة غير معروفة',
                sameAs: jobData.companyWebsite || null,
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city,
                  addressCountry: 'المغرب',
                },
              },
              baseSalary: jobData.salary || 'غير محدد',
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
