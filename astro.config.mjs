import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://louisescher.github.io',
  base: '/starlight-ion-theme',
  integrations: [starlight({
    title: 'StringLabs',
    logo: {
      src: './src/assets/stringlogo.png'
    },
    social: {
      github: 'https://github.com/slaranium',
      twitter: 'https://x.com/slaranium',
      telegram: 'https://t.me/slarahimura'
    },
    sidebar: [{
      label: '[home] Home',
      link: '/'
    }
    , {
      label: '[box] TESTNET',
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: '[book] MONITORING',
      autogenerate: {
        directory: 'reference'
      }
    }],
    components: {
      ThemeProvider: './src/components/ThemeProvider.astro',
      ThemeSelect: './src/components/ThemeSelect.astro',
      SiteTitle: './src/components/SiteTitle.astro',
      Sidebar: './src/components/Sidebar.astro',
      Pagination: './src/components/Pagination.astro',
      Hero: './src/components/Hero.astro',
    },
    customCss: [
      '@fontsource-variable/space-grotesk/index.css',
      '@fontsource/space-mono/400.css',
      '@fontsource/space-mono/700.css',
      './src/styles/theme.css'
    ],
    expressiveCode: {
      themes: ['github-dark']
    },
    pagination: false,
    lastUpdated: true
  })],
  output: "static"
});