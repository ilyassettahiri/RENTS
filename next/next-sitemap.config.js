/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.rents.ma',  // Your domain
  generateRobotsTxt: true,          // Generate robots.txt alongside the sitemap
  sitemapSize: 7000,                // Split sitemap if it exceeds this number of entries
  exclude: ['/dashboard/*', '/auth/*'], // Exclude specific pages if needed
};
