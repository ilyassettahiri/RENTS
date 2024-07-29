import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: 'Minimals',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    assetURL: process.env.NEXT_PUBLIC_ASSET_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    version: packageJson.version,
  },
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapbox: {
    apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  },
  /**
   * Firebase
   */

  /**
   * Amplify
   */

  /**
   * Auth0
   */

  /**
   * Supabase
   */

};
