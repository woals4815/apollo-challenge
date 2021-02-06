module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "1px",
        1: "1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
