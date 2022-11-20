module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'body': '#282828',
        'selected-text': '#fe8019',
        'theme': '#8ec07c',
        'theme-dim': '#689d6a',
        'nav': '#404053',
        'primary-dim': '#b16286', // purple
        'primary': '#d3869b', // purple
        'secondary-dim': '#458588', //blu-ish
        'secondary': '#83a598', //blu-ish
        'tertiary-bright': '#fabd2f', // yellow orangeish
        'tertiary-dim': '#d79921', // yellow orangish
        'badge': '#3F3F51',
        'badge-selected': '#504945',
        'gruvbox-gray-dim': '#d5c4a1',
        'gruvbox-gray': '#ebdbb2',
        'input-border': '#565666',
        'badge-dim': '#3c3836',
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