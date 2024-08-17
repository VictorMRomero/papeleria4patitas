/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        reactStrictMode: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            }

        ]
    }
}

module.exports = nextConfig

