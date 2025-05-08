module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Escanea todos los archivos en la carpeta src
      ],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 2s ease-in-out',
          bounceSlow: 'bounce 3s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  };