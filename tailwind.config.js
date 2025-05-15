/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",     // para Next.js versão até 12
      "./app/**/*.{js,ts,jsx,tsx}",       // para Next.js versão 13+
      "./components/**/*.{js,ts,jsx,tsx}" // para seus componentes
    ],
    theme: {
      extend: {
        colors: {
          primary: "#BAD7F5",
          secondary: "#F59E0B",
          accent: "#10B981"
        }
      },
    },
    plugins: [],
  }
  