// ----------------------------------------------------------------------

export const GOOGLE_MAP_API = process.env.NEXT_PUBLIC_MAP_API;


export const CONFIG = {

  site: {
    name: 'Minimals',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    assetURL: process.env.NEXT_PUBLIC_ASSET_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  },

  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT || 'false'),



};
