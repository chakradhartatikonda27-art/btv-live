export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://btv-live-72s3.vercel.app/sitemap.xml',
  };
}
