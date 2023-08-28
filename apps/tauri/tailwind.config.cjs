const config = require('ui/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', ...config.content],
};
