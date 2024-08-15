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
        'royal-blue': {
          '50': '#f0f4fe',
          '100': '#dde6fc',
          '200': '#c3d4fa',
          '300': '#9bb9f5',
          '400': '#6b94ef',
          '500': '#5378ea',
          '600': '#3351dd',
          '700': '#2a3ecb',
          '800': '#2834a5',
          '900': '#263282',
          '950': '#1b2050',
        },
        'aquamarine': {
          '50': '#ebfef7',
          '100': '#cffce9',
          '200': '#a3f7d8',
          '300': '#53eabc',
          '400': '#2ddaab',
          '500': '#08c195',
          '600': '#009d7a',
          '700': '#007d65',
          '800': '#026351',
          '900': '#035144',
          '950': '#002e27',
        },
          'terracotta': {
          '50': '#fef4f2',
          '100': '#fde7e3',
          '200': '#fcd3cc',
          '300': '#f9b4a8',
          '400': '#f38876',
          '500': '#ea6953',
          '600': '#d6452c',
          '700': '#b33722',
          '800': '#95301f',
          '900': '#7c2d20',
          '950': '#43140c',
        },
        'pigeon-post': {
            '50': '#f3f7fa',
            '100': '#e9eff6',
            '200': '#d8e1ed',
            '300': '#bfcde2',
            '400': '#a9b8d6',
            '500': '#8e9cc6',
            '600': '#7681b5',
            '700': '#646e9e',
            '800': '#535b80',
            '900': '#474e68',
            '950': '#292c3d',
        },
        'base':'#e9eff6',
        'base-dark': '#292c3d',
        'navegacion': '#7681b5',
      },
    },
  },
  plugins: [],
}
export default config
