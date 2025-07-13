import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // The development server is being proxied through a custom domain,
  // so we need to allow that domain as an origin for the dev server.
  devServer: {
    allowedDevOrigins: ['*.cloudworkstations.dev'],
  },
};

export default nextConfig;
