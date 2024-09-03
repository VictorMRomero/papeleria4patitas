import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom-bottom': '0px 3px 10px rgba(0, 0, 0, 0.25)',
      },

      colors: {
        'orient': {
          '50': '#e8ffff',
          '100': '#c6ffff',
          '200': '#95ffff',
          '300': '#4cfdff',
          '400': '#00eeff',
          '500': '#00d0fa',
          '600': '#00a3d2',
          '700': '#0082a8',
          '800': '#036483',
          '900': '#085571',
          '950': '#00384f',
        },
        'white-linen': {
          '50': '#f8f0ea',
          '100': '#f5e9e0',
          '200': '#e9d0bf',
          '300': '#dbb096',
          '400': '#cb8b6c',
          '500': '#c06f4f',
          '600': '#b35b43',
          '700': '#954839',
          '800': '#783c34',
          '900': '#62332c',
          '950': '#341816',
        },

      },
    },
  },
  plugins: [],
}
export default config
