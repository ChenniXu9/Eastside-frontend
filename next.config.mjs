/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.pexels.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ]
      },

};


export default nextConfig;
