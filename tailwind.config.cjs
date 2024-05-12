/** @type {import("tailwindcss").Config} */
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        "primary": "#08D9D6",
        "primary-shadow": "#099E9C",
        "secondary": "#1D232A"
      },
      backgroundImage: {
        "body-main": "url('/static/background.svg')"
      },
      transitionProperty: {
        "width": "width"
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
    themes: [
      {
        "dark": {
          "primary": "#08D9D6",
          "primary-focus": "#570df8",
          "primary-content": "#000000",
          "secondary": "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          "neutral": "#1d232a",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#3d4451",
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f"
        }
      },
      "light"
    ]
  },

  plugins: [require("daisyui"), require("tailwind-scrollbar")]
});
