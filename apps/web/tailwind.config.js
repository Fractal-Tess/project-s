/** @type {import('tailwindcss').Config} */
const config = require('ui/tailwind.config');

// Can modify config here.
module.exports = {
  ...config,
  content: ['./app/**/*.{jsx,ts}', ...config.content],
};
