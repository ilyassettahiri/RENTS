import { CONFIG } from 'src/config-global';

import { AccountView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Account settings | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <AccountView />;
}
