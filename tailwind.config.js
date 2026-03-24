/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        statsFadeUp: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(24px)',
            filter: 'blur(6px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)',
            filter: 'blur(0)' 
          },
        }
      },
      animation: {
        'stats-fade-up': 'statsFadeUp 0.8s ease-out forwards',
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.fade-up': {
          opacity: '0',
          filter: 'blur(8px)',
          transform: 'translateY(30px) scale(0.98)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out',
        },
        '.fade-up.visible': {
          opacity: '1',
          filter: 'blur(0)',
          transform: 'translateY(0) scale(1)',
        },
        '.fade-up-delay-100': { transitionDelay: '0.1s' },
        '.fade-up-delay-200': { transitionDelay: '0.2s' },
        '.fade-up-delay-300': { transitionDelay: '0.3s' },
        '.fade-up-delay-400': { transitionDelay: '0.4s' },
      })
    }
  ],
};
