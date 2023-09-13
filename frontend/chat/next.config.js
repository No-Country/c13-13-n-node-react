/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        API_BASE_URL: process.env.API_BASE_URL
      },
}

module.exports = nextConfig
