/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }
    ]
  },
  output: 'standalone'
};

export default nextConfig; 