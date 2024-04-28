/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        'primary': "#08D9D6",
        'primary-shadow': "#099E9C"
      },
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
