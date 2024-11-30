
import axios from 'axios';
import { cookies } from 'next/headers';

import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `Emploi ${type} à ${city} - Postulez sur RENTS.ma`,
    description: `Découvrez cette opportunité d'emploi ${type} à ${city} sur RENTS.ma. Consultez les détails du poste, les exigences et contactez l'entreprise recruteuse.`,
    keywords: `Emploi ${type} à ${city}, Opportunité d'emploi ${type} ${city}, Carrières ${type} ${city}, Détails d'emploi ${type} à ${city}`,
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/jobs/${city}/${type}/${params.url}`,
      title: `Emploi ${type} à ${city} - Postulez sur RENTS.ma`,
      description: `Consultez les détails de ce poste ${type} à ${city}. Découvrez les exigences, la description et contactez l'entreprise recruteuse.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Emploi ${type} à ${city} - Postulez sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Emploi ${type} à ${city} - Postulez sur RENTS.ma`,
      description: `Découvrez cette opportunité d'emploi ${type} à ${city} sur RENTS.ma. Consultez les détails du poste et contactez l'entreprise recruteuse.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/jobs/${city}/${type}/${params.url}`,
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
              title: `Emploi ${type} à ${city}`,
              description: jobData.description || `Découvrez cette opportunité d'emploi ${type} à ${city}.`,
              employmentType: jobData.employmentType || 'Temps plein',
              datePosted: jobData.datePosted || new Date().toISOString(),
              validThrough: jobData.validThrough || null,
              hiringOrganization: {
                "@type": "Organization",
                name: jobData.companyName || 'Entreprise inconnue',
                sameAs: jobData.companyWebsite || null,
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city,
                  addressCountry: 'Maroc',
                },
              },
              baseSalary: jobData.salary || 'Non spécifié',
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
