const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Include ../shared in serverless bundles (monorepo).
  outputFileTracingRoot: path.join(__dirname, ".."),
  async redirects() {
    return [
      { source: "/admin/home", destination: "/admin/content/home", permanent: true },
      { source: "/admin/pages/home", destination: "/admin/content/home", permanent: true },
      { source: "/admin/pages/about", destination: "/admin/about", permanent: true },
      { source: "/admin/pages/contact", destination: "/admin/content/contact", permanent: true },
      { source: "/admin/contact", destination: "/admin/content/contact", permanent: true },
      { source: "/admin/site", destination: "/admin/settings/site", permanent: true },
      { source: "/admin/settings/footer", destination: "/admin/content/footer", permanent: true },
      { source: "/admin/footer", destination: "/admin/content/footer", permanent: true },
      { source: "/admin/navigation", destination: "/admin/settings/site", permanent: true },
      { source: "/admin/typography", destination: "/admin/settings/site", permanent: true },
      { source: "/admin/experience", destination: "/admin/about?tab=experience", permanent: true },
      { source: "/admin/education", destination: "/admin/about?tab=education", permanent: true },
      { source: "/admin/skills", destination: "/admin/about?tab=skills", permanent: true },
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
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
