// next.config.mjs
import path from 'path';
import rewrites from './rewrites.js';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

// Import New Relic using CommonJS
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('./newrelic.cjs'); // Ensure New Relic is imported

const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'sb.scorecardresearch.com',
      'picsum.photos',
      'static.tnnbt.in',
      'images.unilist.in',
    ],
  },
  async rewrites() {
    return rewrites;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Hostid',
            value: process.env.HOST_ID || '1005',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Ensure we are only modifying the client-side webpack configuration
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('css')) {
        const cssLoaderIndex = rule.use.findIndex(
          (use) =>
            use.loader && use.loader.includes('/css-loader/') && use.options
        );

        if (cssLoaderIndex !== -1) {
          const cssLoader = rule.use[cssLoaderIndex];
          const cssLoaderOptions = cssLoader.options || {};

          cssLoaderOptions.modules = {
            ...cssLoaderOptions.modules,
            localIdentName: dev ? '[local]__[hash:base64:5]' : '[hash:base64:8]',
            exportLocalsConvention: 'camelCase',
          };

          cssLoader.options = cssLoaderOptions;
        }
      }
    });
    
    if (!isServer) {
      // Disable node built-in modules not supported by webpack
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  experimental: {
    amp: {
      optimizer: true,
    },
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withPWA({
  dest: 'public',
  disable: false,
})(nextConfig));
