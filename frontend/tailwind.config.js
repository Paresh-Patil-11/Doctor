/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // 🔑 ADD THIS BLOCK HERE
    container: {
      center: true, // <--- THIS IS THE KEY LINE
      padding: '1rem', // Optional: adds padding to keep content off the edges
    },
    // ----------------------
    extend: {
      colors: {
        hospital: {
          primary: '#006D77',
          secondary: '#83C5BE',
          neutral: '#EDF6F9',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
        'sm': '0.25rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}