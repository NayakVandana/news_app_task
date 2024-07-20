/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          "50": "rgba(195, 239, 255, 0.40)",
          "100": "#8fe1ff",
          "200": "#4dcfff",
          "300": "#0abeff",
          "400": "#0092c8",
          "500": "#087198",
          "600": "#0c536c",
          "700": "#0c3645",
          "800": "#081b22",
          "900": "#010202"
        },
        "secondary": {
          "50": "#47a6ff",
          "100": "#0586ff",
          "200": "#0064c2",
          "300": "#004280",
          "400": "#00203D",
          "500": "#010b15",
          "600": "#-2-9-10",
          "700": "#-8-1d-30",
          "800": "#-13-31-4d",
          "900": "#-22-45-65"
        },
        "light-primary": "#bad8f4",
        // "primary-50": "#bad8f4",
        "primary-muted": "hsl(var(--primary-muted) / <alpha-value>)",

      },
    },
  },
  plugins: [],
}

