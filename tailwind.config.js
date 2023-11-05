/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
          colors:{
            'primary': '#0057ff',
            'body': '#F9F9FF',
          }
        },
    },
    plugins: [require('flowbite/plugin')],
};
