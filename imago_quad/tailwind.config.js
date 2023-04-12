/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				ribeye: ['RibeyeRegular', 'sans-serif'],
				earwig: ['Earwig', 'sans-serif']
			},
    },
  },
  plugins: [],
}
