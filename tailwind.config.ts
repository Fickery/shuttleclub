import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    "./node_modules/@nextui-org/theme/dist/components/(modal|snippet|code|input).js",
  ],
  theme: {
    extend: {
      colors: {
        red: "#FF0000",
        blue: "#1400FE",
        lightgrey: "#ECECEC",
        grey: "#F4EFEF",
        dgrey: "#ADADAD",
        hovgrey: "#9A9A9A",
      },
      darkMode: "class",
      plugins: [nextui()],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
