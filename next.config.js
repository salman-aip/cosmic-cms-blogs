/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cosmicjs.com",
      },
      {
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

module.exports = nextConfig;
