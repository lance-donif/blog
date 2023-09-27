/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'www.apple.com.cn',
                port: '',
                pathname: '/**',
            },
        ],
    }, experimental: {
        serverActions: true,
    },
}
module.exports = nextConfig
