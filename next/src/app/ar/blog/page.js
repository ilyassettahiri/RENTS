import BlogView from 'src/sections/blog/blog-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  return <BlogView />;
}
