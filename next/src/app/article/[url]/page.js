import ArticleView from 'src/sections/blog/article-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Blog Post',
};



const ArticlePage = ({ params }) => {
  return <ArticleView params={params} />;
};

export default ArticlePage;
