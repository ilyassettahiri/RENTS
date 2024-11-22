import { CONFIG } from 'src/config-global';

import { ReviewListView } from 'src/sections/review/view';

// ----------------------------------------------------------------------

export const metadata = { title: `review list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ReviewListView />;
}
