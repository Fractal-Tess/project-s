/** @type {import('tailwindcss').Config} */
const config = require('ui/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ['src/**/*.{tsx,ts}', ...config.content],
};
