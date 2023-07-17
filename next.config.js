/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ["openweathermap.org", "i.scdn.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api2/:path*",
        destination: "https://cinephile-test-server.vercel.app/api/:path*",
      },
    ];
  },
};
