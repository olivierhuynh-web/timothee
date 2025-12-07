/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // Active Turbopack proprement
  reactStrictMode: true,

  images: {
    domains: ['example.com', 'cdn.example.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/assets/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
