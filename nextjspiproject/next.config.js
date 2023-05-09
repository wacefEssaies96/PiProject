const nextConfig = {
  reactStrictMode: true,
  env: {
    backurl: 'http://localhost:3030',
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
