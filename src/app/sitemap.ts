import { MetadataRoute } from 'next';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../convex/_generated/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mpdao.xyz';

  // Static routes
  const routes = [
    '',
    '/about',
    '/events',
    '/team',
    '/partnership',
    '/terms',
    '/privacy',
    '/code-of-conduct',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Event Routes
  try {
    const events = await fetchQuery(api.events.getEvents);
    const eventRoutes = events.map((event: any) => ({
      url: `${baseUrl}/events/${event.slug || event._id}`,
      lastModified: new Date(event._creationTime),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));
    return [...routes, ...eventRoutes];
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
    return routes;
  }
}
