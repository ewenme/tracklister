module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      'sans': ['Inconsolata', 'monospace'],
      serif: ['Inconsolata', 'monospace']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
