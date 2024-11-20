
import axios from 'axios';
import Script from 'next/script';


import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { url } = params;


  return {
    title: `${url}`,
  };
}




export default async function ArticlePage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const articleEndpoint = `${API_URL}/article/${params.url}`;

  try {
    // Fetch article data server-side
    const response = await axios.get(articleEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const articleData = response.data;

    // Pass fetched data to ArticleView
    return <ArticleView params={params} articleData={articleData} />;
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
