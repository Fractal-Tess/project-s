import config from 'ui/tailwind.config';

console.log(config.daisyui);
/** @type {import('tailwindcss').Config} */
export default {
  ...config,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', ...config.content],
};
