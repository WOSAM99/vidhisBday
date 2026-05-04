/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0F",
        gold: "#C6A85B",
        bone: "#EAEAEA",
        wine: "#5C111A",
        ember: "#7A1D2A",
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(198, 168, 91, 0.28)",
        seal: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 2px 10px rgba(255, 255, 255, 0.12)",
      },
      backgroundImage: {
        "castle-mist":
          "radial-gradient(circle at top, rgba(198,168,91,0.16), transparent 28%), radial-gradient(circle at 20% 20%, rgba(122,29,42,0.18), transparent 20%), linear-gradient(180deg, rgba(11,11,15,0.92), rgba(11,11,15,1))",
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
