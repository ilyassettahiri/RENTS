import BusinessListView from 'src/sections/business-list/business-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Business',
};

export default function BusinessListPage() {
  return <BusinessListView />;
}
