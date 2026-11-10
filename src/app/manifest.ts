import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dietitian & Nutritionist - Holistic Wellness',
    short_name: 'Dietitian',
    description: 'Evidence-based, personalized nutrition and lifestyle coaching.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF9F6',
    theme_color: '#507D2A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // In Phase 5/6, we will add more precise icons (e.g. 192x192, 512x512)
    ],
  };
}
