import BlogView from 'src/sections/blog/blog-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Blog - RENTS.ma | Discover Tips and Insights on Rentals in Morocco',
    description: 'Explore the RENTS.ma blog for the latest updates, tips, and insights on renting cars, properties, and more in Morocco.',
    keywords: 'Rental blog, RENTS.ma tips, Morocco rental insights, Rental guides, RENTS.ma blog',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/blog',
      title: 'Blog - RENTS.ma | Discover Tips and Insights on Rentals in Morocco',
      description: 'Stay informed with the RENTS.ma blog. Discover helpful guides, rental tips, and the latest updates on Morocco’s rental market.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a blog-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Blog - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - RENTS.ma | Discover Tips and Insights on Rentals in Morocco',
      description: 'Explore helpful guides and insights on renting in Morocco with the RENTS.ma blog.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a blog-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/blog',
      languages: {
        en: 'https://rents.ma/en/blog',
        ar: 'https://rents.ma/ar/blog',
        fr: 'https://rents.ma/fr/blog',
      },
    },
  };
}

export default function BlogPage() {



  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="blog-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: 'RENTS.ma Blog',
            url: 'https://rents.ma/en/blog',
            description: 'Discover insights, tips, and the latest updates on renting cars, properties, and more in Morocco with the RENTS.ma blog.',
            blogPost: {
              "@type": "BlogPosting",
              headline: 'Discover the Best Rental Tips in Morocco',
              alternativeHeadline: 'Tips and Insights on Morocco Rentals',
              author: {
                "@type": "Organization",
                name: 'RENTS.ma',
              },
              publisher: {
                "@type": "Organization",
                name: 'RENTS.ma',
                logo: {
                  "@type": "ImageObject",
                  url: 'https://rents.ma/favicon/android-chrome-192x192.png',
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": 'https://rents.ma/en/blog',
              },
            },
          }),
        }}
      />
      {/* Render Blog Content */}
      <BlogView />
    </>
  );



}
