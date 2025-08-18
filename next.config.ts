
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
  /**
   * Excludes server-only modules from the client-side bundle.
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/webpack
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only modules from the client-side bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "mongodb-client-encryption": false,
        "aws4": false,
        "snappy": false,
        "@mongodb-js/zstd": false,
        "kerberos": false,
        "child_process": false,
        "fs": false,
      };
    }
    return config;
  },
};

export default nextConfig;
