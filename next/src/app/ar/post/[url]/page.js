import axios from 'axios';
import Script from 'next/script';

import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';

export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `${url} - منشور مدونة | RENTS.ma`,
    description: `اقرأ منشور المدونة "${url}" على موقع RENTS.ma. اكتشف الرؤى والنصائح والمعلومات المتعلقة بالإيجارات في المغرب.`,
    keywords: `مدونة ${url}, مدونة RENTS.ma, إيجارات المغرب, نصائح التأجير, مقال ${url}`,
    openGraph: {
      type: 'article',
      locale: 'ar_MA',
      url: `https://rents.ma/ar/post/${url}`,
      title: `${url} - منشور مدونة | RENTS.ma`,
      description: `اكتشف أحدث الرؤى والنصائح مع المقال "${url}" على موقع RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة للمدونة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: `${url} - منشور مدونة | RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${url} - منشور مدونة | RENTS.ma`,
      description: `اكتشف الرؤى والنصائح من المقال "${url}" على موقع RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة محددة للمدونة إذا كانت متوفرة
    },
    alternates: {
      canonical: `https://rents.ma/ar/post/${url}`,
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
        {/* البيانات المنظمة للصفحة */}
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
              url: `https://rents.ma/ar/post/${url}`,
              description: articleData.description || `اقرأ منشور المدونة "${url}" على موقع RENTS.ma.`,
            }),
          }}
        />
        {/* عرض محتوى المقال */}
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
