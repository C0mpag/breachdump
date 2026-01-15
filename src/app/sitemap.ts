import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    '',
    '/services',
    '/service-areas',
    '/quote',
    '/contact',
    '/about',
    '/reviews',
    '/privacy',
    '/terms'
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.7
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    })),
    ...areas.map((area) => ({
      url: `${base}/service-areas/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  ];
}
