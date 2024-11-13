/** @type {import('next').NextConfig} */
const nextConfig = {};
nextConfig.images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "openweathermap.org",
      port: "",
      pathname: "/img/wn/**",
    },
  ],
};
module.exports = nextConfig;
