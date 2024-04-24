/** @type {import("tailwindcss").Config} */
import daisyui from "daisyui";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        sarpanch: ["Sarpanch", "sans-serif"]
      }
    }
  },
  daisyui: {
    themes: ["dark"]
  },

  plugins: [require("daisyui")]
};
