module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "garden",
      {
        dark: {
          ...require("daisyui/colors/themes")["[data-theme=dark]"],
          primary: "#E66464",
          "primary-focus": "#b34d4d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
