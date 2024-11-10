import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${url}`, // Customize the title as needed
  };
}

const ArticlePage = ({ params }) => <ArticleView params={params} />;

export default ArticlePage;

ArticlePage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
    // other params can be added here if needed
  }).isRequired,
};
