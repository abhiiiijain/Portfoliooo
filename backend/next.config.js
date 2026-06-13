const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@portfoliooo/shared"] = path.join(__dirname, "../shared");
    return config;
  },
};

module.exports = nextConfig;
