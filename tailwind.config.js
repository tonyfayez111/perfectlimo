/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        perfect: {
          red: '#e31e24',
          'dark-red': '#b71c22',
          white: '#ffffff',
          black: '#000000',
          gray: '#333333',
          'light-gray': '#f5f5f5',
          'text-gray': '#666666',
          gold: '#ffd700',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        bounce: 'bounce 2s infinite',
        spin: 'spin 1s linear infinite',
        slideInRight: 'slideInRight 0.3s ease',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'red-gradient': 'linear-gradient(135deg, #e31e24 0%, #b71c22 100%)',
      },
      boxShadow: {
        'perfect': '0 10px 30px rgba(227, 30, 36, 0.2)',
        'perfect-lg': '0 20px 50px rgba(227, 30, 36, 0.3)',
      },
    },
  },
  plugins: [],
}
