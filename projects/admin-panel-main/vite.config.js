import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  extend: {
  animation: {
    'slide-down': 'slideDown 0.4s ease-out',
  },
  keyframes: {
    slideDown: {
      '0%': { transform: 'translateY(-50%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
},
extend: {
  animation: {
    'slide-down': 'slideDown 0.4s ease-out',
  },
  keyframes: {
    slideDown: {
      '0%': { transform: 'translateY(-50%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
},
})
