/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }
    ]
  },
  // Adicionar configurações importantes para o Vercel
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
};

export default nextConfig; 