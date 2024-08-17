/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
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

