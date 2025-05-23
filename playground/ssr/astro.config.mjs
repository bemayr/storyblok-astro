import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import tailwind from '@astrojs/tailwind';
import mkcert from 'vite-plugin-mkcert';
import vercel from '@astrojs/vercel/serverless';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    vue(),
    react(),
    storyblok({
      accessToken: 'OsvNv534kS2nivAAj1EPVgtt',
      apiOptions: {
        cache: {
          clear: 'auto',
          type: 'memory',
        },
      },
      useCustomApi: false,
      bridge: {
        resolveRelations: ['featured-articles.posts'],
      },
      enableFallbackComponent: true,
      livePreview: true,
      components: {
        'page': 'storyblok/Page',
        'feature': 'storyblok/Feature',
        'grid': 'storyblok/Grid',
        'teaser': 'storyblok/Teaser',
        'vue_counter': 'storyblok/VueCounter',
        'svelte_counter': 'storyblok/SvelteCounter',
        'react_counter': 'storyblok/ReactCounter',
        'featured-articles': 'storyblok/FeaturedArticles',
        'main': 'storyblok/Main',
      },
    }),
    tailwind(),
  ],
  vite: {
    plugins: [mkcert()],
  },
  output: 'server',
  adapter: vercel(),
  /**
   * Note: to build an SSR test environment using the WIP version, host generated package on Git, e.g. git+https://github.com/manuelschroederdev/storyblok-astro-dist
   */
});
