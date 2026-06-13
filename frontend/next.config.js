const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/admin/home", destination: "/admin/pages/home", permanent: true },
      { source: "/admin/about", destination: "/admin/pages/about", permanent: true },
      { source: "/admin/contact", destination: "/admin/pages/contact", permanent: true },
      { source: "/admin/site", destination: "/admin/settings/site", permanent: true },
      { source: "/admin/footer", destination: "/admin/settings/footer", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@portfoliooo/shared"] = path.join(__dirname, "../shared");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
