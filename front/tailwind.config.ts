import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Way Canguk fork: the accent (emerald in upstream) becomes forest green,
      // matching the project logo (700 = #2E6B3F, 200 = logo disc #B9D7A6).
      colors: {
        emerald: {
          50: "#F1F7EE",
          100: "#DDEBD4",
          200: "#B9D7A6",
          300: "#93BF7E",
          400: "#6CA35A",
          500: "#4C8A46",
          600: "#3A7A41",
          700: "#2E6B3F",
          800: "#245636",
          900: "#1C442C",
          950: "#0F2A1B",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        width: "width",
      },
      strokeWidth: {
        "3": "3px",
        "4": "4px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;
