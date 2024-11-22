import { CONFIG } from 'src/config-global';

import { StoreListView } from 'src/sections/store/view';

// ----------------------------------------------------------------------

export const metadata = { title: `store list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <StoreListView />;
}
