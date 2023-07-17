/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGES_URL, "flagcdn.com"]
      }
}

module.exports = nextConfig
