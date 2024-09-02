import ArticleView from 'src/sections/blog/article-view';

import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog Post',
};

const ArticlePage = ({ params }) => <ArticleView params={params} />;

export default ArticlePage;

ArticlePage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
    // other params can be added here if needed
  }).isRequired,
};
