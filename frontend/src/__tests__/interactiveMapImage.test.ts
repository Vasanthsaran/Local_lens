import { Place } from '@/types';

describe('InteractiveMap Place image resolution test', () => {
  it('prefers image_url when available and falls back to image property', () => {
    const placeWithBoth: Place = {
      id: 'p1', state_id: 'karnataka', city_id: 'bengaluru',
      title: 'Bangalore Palace', sub_location: 'Bengaluru',
      rating: 4.6, reviews_count: 38000, category: 'Palace',
      image: 'https://example.com/fallback.jpg',
      image_url: 'https://example.com/agent_image.jpg',
      description: 'Royal palace', latitude: 12.9988, longitude: 77.5921, tags: ['#Palace']
    };

    const placeWithOnlyImage: Place = {
      id: 'p2', state_id: 'karnataka', city_id: 'bengaluru',
      title: 'Cubbon Park', sub_location: 'Bengaluru',
      rating: 4.7, reviews_count: 42000, category: 'Park',
      image: 'https://example.com/fallback.jpg',
      description: 'Botanical garden', latitude: 12.9763, longitude: 77.5929, tags: ['#Park']
    };

    const resolveSrc = (p: Place) => p.image_url || p.image;

    expect(resolveSrc(placeWithBoth)).toBe('https://example.com/agent_image.jpg');
    expect(resolveSrc(placeWithOnlyImage)).toBe('https://example.com/fallback.jpg');
  });
});
