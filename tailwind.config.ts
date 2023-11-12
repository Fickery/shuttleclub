import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        red: "#FF0000",
        blue: "#1400FE",
        lightgrey: "#FBF9F9",
        grey: "#F4EFEF",
        dgrey: "#ADADAD",
        hovgrey: "#9A9A9A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
