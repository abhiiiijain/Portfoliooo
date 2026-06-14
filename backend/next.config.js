const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Include ../shared in production bundles (monorepo).
  outputFileTracingRoot: path.join(__dirname, ".."),
  async redirects() {
    return [
      { source: "/", destination: "/api/keepalive", permanent: false },
      { source: "/keepalive", destination: "/api/keepalive", permanent: false },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@portfoliooo/shared"] = path.join(__dirname, "../shared");
    return config;
  },
};

module.exports = nextConfig;
