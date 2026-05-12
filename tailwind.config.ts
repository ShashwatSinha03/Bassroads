import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#01172F",
        accent: "#632C38",
        "surface-dark": "#1A1A1A",
        "bg-dark": "#0A0A0A",
      },
    },
  },
  plugins: [],
};
export default config;