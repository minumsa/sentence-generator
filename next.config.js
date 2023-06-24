/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
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
