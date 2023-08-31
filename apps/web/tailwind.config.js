/** @type {import('tailwindcss').Config} */
const config = require('ui/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ['src/**/*.{tsx,ts}', ...config.content],
};
