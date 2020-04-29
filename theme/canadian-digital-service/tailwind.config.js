module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          '200': '#E1F0F8',
        },
        gray: {
          '400': '#cbcbcb',
          '600': '#808080',
          '700': '#666666',
        },
      },
    },
    boxShadow: {
      result: '0px 0px 12px -2px rgba(0,0,0,0.4)',
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
  important: true,
}
