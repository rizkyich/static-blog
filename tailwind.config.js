module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '30rem',
       },
       colors: {
         cyan: {
           light: '#3DC6E5',
           DEFAULT: '#2DB0DC',
           dark: '#1498D1'
         }
       }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover']
    },
  },
  plugins: [],
}
