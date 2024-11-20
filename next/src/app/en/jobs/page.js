import JobsView from 'src/sections/jobs-list/jobs-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Jobs in Morocco - Find Employment Opportunities on RENTS.ma',
    description:
      'Explore a wide range of job opportunities across Morocco on RENTS.ma. Discover positions in various industries and connect with top employers nationwide. Start your job search today!',
    keywords: 'Jobs in Morocco, Employment in Morocco, Job opportunities, Morocco industries, Careers on RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/jobs',
      title: 'Jobs in Morocco - Find Employment Opportunities on RENTS.ma',
      description:
        'Discover the latest job opportunities across Morocco. Find positions in various industries and connect with top employers.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Jobs in Morocco - Find Employment Opportunities on RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Jobs in Morocco - Find Employment Opportunities on RENTS.ma',
      description:
        'Explore job opportunities across Morocco. Connect with top employers and start your career journey with RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a jobs-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/jobs',
      languages: {
        en: 'https://rents.ma/en/jobs',
        ar: 'https://rents.ma/ar/jobs',
        fr: 'https://rents.ma/fr/jobs',
      },
    },
  };
}


export default function JobsPage() {


  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Jobs in Morocco - RENTS.ma',
            url: 'https://rents.ma/en/jobs',
            description:
              'Explore a wide range of job opportunities in Morocco. Discover positions in various industries and connect with top employers.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Software Developer Jobs',
                  url: 'https://rents.ma/en/jobs/software-developer',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Marketing Jobs',
                  url: 'https://rents.ma/en/jobs/marketing',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Sales Jobs',
                  url: 'https://rents.ma/en/jobs/sales',
                },
              ],
            },
          }),
        }}
      />
      {/* Render Jobs Content */}
      <JobsView />
    </>
  );


}
