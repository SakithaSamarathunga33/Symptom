/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3b82f6',
                    dark: '#1d4ed8',
                    light: '#93c5fd',
                },
                secondary: {
                    DEFAULT: '#10b981',
                    dark: '#059669',
                },
                accent: {
                    DEFAULT: '#8b5cf6',
                },
                background: '#f8fafc',
                surface: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
