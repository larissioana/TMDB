const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    // Minify JavaScript for production builds only
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
          },
        })
      );
    }
    return config;
  },
};