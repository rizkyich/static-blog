module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        sm: '8px',
        md: '16px',
        lg: '26rem',
        xl: '30rem',
        '2xl': '35rem' 
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
