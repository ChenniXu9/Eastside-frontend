import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        '6': '6 1 0%',
      },
      colors: {
        "primary-color": "var(--bg)",
        "primary-soft": "var(--bg)",
        "primary-text": "var(--bg)",
        "textSoft": "var(--bg)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        avenir: ['Avenir', 'sans-serif'],
        glaical: ['GlaicalIndifference', 'sans-serif'],
      },
      fontWeight: {
        black: '900',
        book: '400',
        roman: '500',
        bold: 'bold',
        regular: 'normal',
      },
    },
  },
  plugins: [],
};
export default config;
