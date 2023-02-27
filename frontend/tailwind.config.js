/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        "aachen-back": "rgba(64, 64, 64, 1)",
        "date-event": "rgba(224, 224, 224, 1)",
        "aachen-yellow": "rgba(250, 197, 32, 1)",
        "aachen-yellow-darker": "rgba(255, 255, 255, 0.2)",
        "aachen-page": "rgba(45, 45, 45, 1)",
        "aachen-search": "rgba(32, 32, 32, 1)",
        "aachen-placeholder": "rgba(171, 171, 171, 1)",
        "aachen-toggler": "rgba(128, 128, 128, 1)",
        "aachen-event": "rgba(30, 30, 30, 1)",
        "button-border": "rgba(112, 112, 112, 1)",
        "aachen-green": "rgba(155, 240, 152, 1)",
      },
      width: {
        "890px": "56rem",
        "496px": "31rem",
      },
      animation: {
        slidLeft: "slidLeft 4s ease 0s 1 normal forwards",
      },
      keyframes: {
        slidLeft: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(400px)",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("flowbite/plugin"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
