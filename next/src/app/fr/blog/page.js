import BlogView from 'src/sections/blog/blog-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Blog - RENTS.ma | Découvrez des conseils et idées sur les locations au Maroc',
    description: 'Explorez le blog de RENTS.ma pour des mises à jour, conseils, et idées sur la location de voitures, de biens immobiliers, et plus encore au Maroc.',
    keywords: 'Blog location, Conseils RENTS.ma, Idées location Maroc, Guides location, Blog RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/blog',
      title: 'Blog - RENTS.ma | Découvrez des conseils et idées sur les locations au Maroc',
      description: 'Restez informé avec le blog de RENTS.ma. Découvrez des guides pratiques, des conseils de location, et les dernières nouvelles sur le marché de la location au Maroc.',
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
      title: 'Blog - RENTS.ma | Découvrez des conseils et idées sur les locations au Maroc',
      description: 'Découvrez des guides pratiques et des idées sur la location au Maroc avec le blog de RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a blog-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/blog',
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
            name: 'Blog de RENTS.ma',
            url: 'https://rents.ma/fr/blog',
            description: 'Découvrez des idées, conseils, et les dernières actualités sur la location de voitures, de biens immobiliers, et plus au Maroc grâce au blog de RENTS.ma.',
            blogPost: {
              "@type": "BlogPosting",
              headline: 'Découvrez les meilleurs conseils sur les locations au Maroc',
              alternativeHeadline: 'Conseils et idées sur les locations au Maroc',
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
                "@id": 'https://rents.ma/fr/blog',
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
