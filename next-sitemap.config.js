/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://theglobaledge.io',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: ['https://theglobaledge.io/sitemap.xml'],
  },
};
