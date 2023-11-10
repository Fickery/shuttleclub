/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/tasks",
        permanent: true,
      },
    ];
  },
};
