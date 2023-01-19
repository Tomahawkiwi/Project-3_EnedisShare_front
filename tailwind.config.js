/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "490px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      publicSans: ["Public Sans", "sans-serif"],
      enedis: ["Enedis", "sans-serif"],
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      "semi-bold": "600",
      bold: "700",
    },
    fontSize: {
      "desk-xxs(mention)": ["10px", "12px"],
      "desk-xs(date)": ["12px", "14px"],
      "desk-sm(textPost+multiuse)": ["14px", "16px"],
      "desk-md(titlePubli+multiuse)": ["16px", "19px"],
      "desk-lg(CTA+input)": ["18px", "20px"],
      "desk-xl(section)": ["20px", "24px"],
      "desk-2xl(headerCard)": ["24px", "29px"],
      "desk-3xl(header+name)": ["32px", "38px"],
      "desk-4xl(welcome)": ["44px", "53px"],
      "mob-xxs(mention+date)": ["10px", "12px"],
      "mob-xs(textPost)": ["12px", "14px"],
      "mob-sm(multiuse)": ["14px", "16px"],
      "mob-md(CTA+input)": ["16px", "19px"],
      "mob-lg(multiuse)": ["18px", "20px"],
      "mob-xl(headers+titles)": ["20px", "24px"],
      "mob-3xl(welcome+name)": ["32px", "38px"],
      "mob-4xl(welcomeConnect)": ["44px", "53px"],
    },
    borderRadius: {
      none: "none",
      full: "100px",
      "app-bloc": "10px",
      "connection-bloc": "25px",
      "select-desk": "3px",
      "select-mobile": "5px",
      "upload-area": "20px",
    },
    colors: {
      "dark-enedis": "#212529",
      "white-enedis": "#FFFFFF",
      "blue-enedis": "#1423DC",
      "green-enedis": "#96CD32",
      "redError-enedis": "#E10028",
    },
    backgroundColor: {
      "background-enedis": "#E5F1FB",
      "blue-enedis": "#1423DC",
      "green-enedis": "#96CD32",
      "dark-enedis": "#212529",
      "white-enedis": "#FFFFFF",
      "yellow-enedis": "#FFC328",
      "redError-enedis": "#E10028",
    },
    extend: {},
  },
  plugins: [],
};
