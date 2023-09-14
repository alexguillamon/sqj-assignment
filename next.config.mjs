// Importing env files here to validate on build
import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "utfs.io"],
  },
};

export default config;
