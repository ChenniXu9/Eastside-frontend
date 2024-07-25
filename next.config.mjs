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
          }
        ]
      },

};


export default nextConfig;
