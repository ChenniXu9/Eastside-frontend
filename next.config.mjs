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
            hostname: "img.clerk.com",
          },
          {
            protocol: "http",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ]
      },
      env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
};


export default nextConfig;
