
import axios from 'axios';

import Script from 'next/script';

import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `${url} - Article de Blog | RENTS.ma`,
    description: `Lisez l'article de blog "${url}" sur RENTS.ma. Découvrez des idées, des astuces et des informations liées aux locations au Maroc.`,
    keywords: `Blog ${url}, Article RENTS.ma, Locations au Maroc, Conseils de location, Article ${url}`,
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/post/${url}`,
      title: `${url} - Article de Blog | RENTS.ma`,
      description: `Explorez les dernières idées et conseils avec l'article "${url}" sur RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique du blog
          width: 1200,
          height: 630,
          alt: `${url} - Article de Blog | RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${url} - Article de Blog | RENTS.ma`,
      description: `Découvrez des idées et des astuces dans l'article "${url}" sur RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique du blog
    },
    alternates: {
      canonical: `https://rents.ma/fr/post/${url}`,
      languages: {
        en: `https://rents.ma/en/post/${url}`,
        ar: `https://rents.ma/ar/post/${url}`,
        fr: `https://rents.ma/fr/post/${url}`,
      },
    },
  };
}





export default async function ArticlePage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const articleEndpoint = `${API_URL}/article/${params.url}`;
  const { url } = params;

  try {
    // Fetch article data server-side
    const response = await axios.get(articleEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const articleData = response.data;

    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="article-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `${articleData.title || url}`,
              author: {
                "@type": "Person",
                name: articleData.author || 'RENTS.ma',
              },
              datePublished: articleData.publishedAt || new Date().toISOString(),
              url: `https://rents.ma/fr/post/${url}`,
              description: articleData.description || `Lisez l'article de blog "${url}" sur RENTS.ma.`,
            }),
          }}
        />
        {/* Render Article Content */}
        <ArticleView params={params} articleData={articleData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching article data:', error);

    // Pass null to ArticleView in case of an error
    return <ArticleView params={params} articleData={null} />;
  }
}

ArticlePage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
