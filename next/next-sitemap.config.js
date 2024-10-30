/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.rents.ma',           // Your domain
  generateRobotsTxt: true,                    // Generate robots.txt alongside the sitemap
  sitemapSize: 7000,                          // Split sitemap if it exceeds this number of entries
  exclude: [
    '/dashboard/*',
    '/auth/*',
    '/checkout/*',            // Exclude the checkout page
    '/thank-you/*'            // Exclude the order completion page
  ],
};

module.exports = config;  // Use CommonJS export for compatibility
