module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'body': '#282828',
        'selected-text': '#fe8019',
        'theme': '#689d6a',
        'nav': '#404053',
        'primary-dim': '#b16286', // purple
        'primary': '#d3869b', // purple
        'secondary': '#458588', //blu-ish
        'tertiary-bright': '#fabd2f', // yellow orangeish
        'tertiary-dim': '#d79921', // yellow orangish
        'badge': '#3F3F51',
        'input-border': '#565666',
        'input': '#2A2A35',
      },
      fontFamily: {
        sans: ["Menlo", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}