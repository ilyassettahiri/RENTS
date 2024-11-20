import NotFoundView from 'src/sections/error/not-found-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: '404 Page Not Found!',
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
