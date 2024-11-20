
import axios from 'axios';
import Script from 'next/script';


import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `${url} - Blog Post | RENTS.ma`,
    description: `Read the blog post "${url}" on RENTS.ma. Explore insights, tips, and information related to rentals in Morocco.`,
    keywords: `${url} blog, RENTS.ma blog, Morocco rentals, rental tips, ${url} article`,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://rents.ma/en/post/${url}`,
      title: `${url} - Blog Post | RENTS.ma`,
      description: `Explore the latest insights and tips with the article "${url}" on RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a blog-specific or generic image
          width: 1200,
          height: 630,
          alt: `${url} - Blog Post | RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${url} - Blog Post | RENTS.ma`,
      description: `Discover insights and tips from the article "${url}" on RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a blog-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/post/${url}`,
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
              url: `https://rents.ma/en/post/${url}`,
              description: articleData.description || `Read the blog post "${url}" on RENTS.ma.`,
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
