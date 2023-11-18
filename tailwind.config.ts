import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ddBlack: "#2B2B2B",
        ddBronze: "#CE6F50",
        ddBlue: "#3463D4",
        ddGrey: "#AAB5C2",
        ddDarkGrey: "#424242",
        ddLightGrey: "#8f8f8f",
        ddMediumGrey: "#1A1A1A"
      },
    },
  },
  plugins: [],
};
export default config;
