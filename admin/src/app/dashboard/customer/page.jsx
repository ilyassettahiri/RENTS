import { CONFIG } from 'src/config-global';

import { CustomerListView } from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export const metadata = { title: `customer list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CustomerListView />;
}
