import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { StoreEditView } from 'src/sections/store/view';

// ----------------------------------------------------------------------

export const metadata = { title: `store edit | Dashboard - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  const  store  = await getStore(id);

  return <StoreEditView store={store} />;
}

// ----------------------------------------------------------------------

async function getStore(id) {
  if (!id) throw new Error('User ID is required to fetch user details');

  const URL = endpoints.store.details(id);
  const res = await axios.get(URL);

  return res.data;
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const res = await axios.get(endpoints.store.list);

    return res.data.stores.map((store) => ({ id: store.id }));
  }
  return [];
}
