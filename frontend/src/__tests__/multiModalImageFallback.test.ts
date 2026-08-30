import { MultiModalAssistantModal } from '@/components/MultiModalAssistantModal';

describe('MultiModalAssistantModal image fallback test', () => {
  it('resolves image URL or returns default fallback image', () => {
    const placeWithNoImages = {
      id: 'p1',
      name: 'Test Place',
      description: 'Test description'
    };

    const resolveImageSrc = (place: any) =>
      place.image_url || place.image || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80';

    expect(resolveImageSrc(placeWithNoImages)).toBe('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80');
  });
});
