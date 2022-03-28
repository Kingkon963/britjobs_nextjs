module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        //   mytheme: {
        //     primary: "#E66464",
        //     "primary-focus": "#b34d4d",
        //     secondary: "#6419E6",
        //     accent: "#769BA6",
        //     neutral: "#191D24",
        //     "base-100": "#2e7186",
        //     "base-200": "#1c4553",
        //     "base-300": "#133039",
        //     info: "#3ABFF8",
        //     success: "#36D399",
        //     warning: "#FBBD23",
        //     error: "#F87272",
        //   },
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
