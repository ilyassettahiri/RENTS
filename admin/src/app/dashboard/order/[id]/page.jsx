import axios, { endpoints } from 'src/utils/axios';

import { _orders } from 'src/_mock/_order';
import { CONFIG } from 'src/config-global';

import { OrderDetailsView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Order details | Dashboard - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  const  order  = await getOrder(id);


  return <OrderDetailsView order={order} />;
}

// ----------------------------------------------------------------------


async function getOrder(id) {

  if (!id) throw new Error('Order ID is required to fetch user details');

  const URL = endpoints.order.details(id);

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
    const res = await axios.get(endpoints.user.list);

    return res.data.users.map((user) => ({ id: user.id }));
  }
  return [];
}

