module.exports = {
  theme: {
    extend: {
      spacing: {
        "56": "14rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
    },
    container: {
      center: true,
    },
    boxShadow: {
      outline: "0 0 0 3px rgba(255, 191, 71, 1)",
    },
    fontFamily: {
      sans: ["lato"],
      body: ["Noto Sans"],
    },
    screens: {
      xxs: "280px",
      xs: "325px",
      sm: "450px",
      md: "550px",
      lg: "768px",
      xl: "1024px",
    },
    colors: {
      red: {
        100: "#f3e9e8",
        default: "#b10e1e",
      },
      white: {
        default: "#FFF",
      },
      blue: {
        default: "#26374A",
        100: "#B2E3FF",
        200: "#DFF8FD",
        300: "#4B98B2",
        400: "#335075",
        500: "#75b9e0",
      },
      gray: {
        default: "#EEE",
        selected: "#e1e4e7",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
      },
      yellow: {
        default: "#ffbf47",
      },
      green: {
        default: "#00703C",
        darker: "#002D18",
      },
      black: {
        default: "#000",
      },
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
