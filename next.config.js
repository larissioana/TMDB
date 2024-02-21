

module.exports = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = 'source-map';
    }

    return config;
  },
};