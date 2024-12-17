module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Deep Blue
        accent: '#F59E0B',  // Amber
        danger: '#DC2626',  // Red
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        hover: '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: '12px',
      },
      animation: {
        fadeInOut: 'fadeInOut 5s ease-in-out',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: 0, transform: 'translateY(-10px)' },
          '10%, 90%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
