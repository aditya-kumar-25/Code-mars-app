/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryTextColor: "#183b56",
        secondaryTextColor: "#577592",
        accentColor: "#2294ed",
        accentColorDark: "#1d69a3",
        navColor:"#212840",
        mainBg:'#ecf0f9'
      },
      padding: {
        inlineSection: "20px",
      }
    },
  },
  plugins: [],
};
