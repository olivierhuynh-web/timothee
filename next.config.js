/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Active le mode strict de React pour détecter les problèmes potentiels
  swcMinify: true, // Utilise SWC pour minifier le code JavaScript
  images: {
    domains: ['example.com', 'cdn.example.com', 'picsum.photos'], // Ajout de picsum.photos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**', // Autorise les images provenant de ce chemin
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/assets/**', // Autorise les images provenant de ce chemin
      },
    ],
  },
  i18n: {
    locales: ['en', 'fr'], // Définissez les langues prises en charge
    defaultLocale: 'fr', // Définissez la langue par défaut
  },
  webpack: (config) => {
    // Ajoutez des configurations Webpack personnalisées ici
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // Permet d'importer des fichiers SVG comme composants React
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true, // Redirection permanente (code 301)
      },
    ];
  },
};

module.exports = nextConfig;
