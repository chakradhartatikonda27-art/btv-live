import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/sign-in/'],
      },
    ],
    sitemap: 'https://www.btvlive.net/sitemap.xml',
    host: 'https://www.btvlive.net',
  };
}
