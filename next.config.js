/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://cinephile-test-server.vercel.app/:path*",
      },
    ];
  },
};
