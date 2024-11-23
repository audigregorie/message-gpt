/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ['"Roboto Slab"', 'serif']
      },
      backgroundColor: {
        mgptTeal: '#64f3d5',
        mgptViolet: '#51538f'
      }
    }
  },
  plugins: []
};
