const rawApi = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/+$/, '');
const apiUrl = rawApi.endsWith('/api/v1') ? rawApi : `${rawApi}/api/v1`;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.grofers.com', 'cdn.zepto.co.in', 'res.cloudinary.com', 'upload.wikimedia.org', 'static-assets-web.flixcart.com', 'www.bigbasket.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${apiUrl}/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
