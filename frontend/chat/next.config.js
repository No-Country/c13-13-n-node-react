/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      },
}

module.exports = nextConfig
