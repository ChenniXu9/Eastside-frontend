/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: {
    //   appDir: true,
    // },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.pexels.com",
          },
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
        ]
      },

};


export default nextConfig;
