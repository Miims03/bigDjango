/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-300/50',
    'border-red-300',
    'text-red-950',
    'bg-blue-300/50',
    'border-blue-300',
    'text-blue-950',
    'bg-purple-300/50',
    'border-purple-300',
    'text-purple-950',
  ],
}

