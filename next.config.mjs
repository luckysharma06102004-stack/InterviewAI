// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'standalone',
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          stream: false,
          crypto: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;