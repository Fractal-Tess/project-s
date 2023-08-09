const path = require('node:path');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['ui'],

  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = config;
