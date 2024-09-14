/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgshade: "var(--bg-shade)",
        greytext: "var(--grey-text)",
        accent: "var(--accent)",
        white: "var(--white)",
        ugsadug: "var(--ugsadug)",
        text: "var(--text)",
        skyblue: "var(--sky-blue)",
        sectionhover: "var(--section-hover)",
        saleTageColor: "var(--sale-tage-coloe)",
        priceTagColor: "var(--price-tag-color)",
        violet: "var(--violet)",
        subTextColor: "var(--sub-text-color)",
        pageButtonColor: "var(--page-button-color)",
        pink: "var(--pink)",
        nav: "var(--nav)",
        dark: "var(--dark)",
        slide: "var(--slide)",
        title: "var(--title)"
      },
      container: {
        center: true,
        padding: "20px",
        screens: {
          lg: "1254px"
        }
      }
    },
  },
  plugins: [],
}

