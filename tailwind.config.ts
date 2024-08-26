import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss";
import {blackA, mauve, violet, indigo, purple} from '@radix-ui/colors'; 

const config: Config = {
  darkMode: ["class"],
  content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
    ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
        primary:{
          green: "hsl(var(--primary-green))",
          black: "hsl(var(--primary-black))",
        },
        secondary:{
          lightGray: "hsl(var(--secondary-light-gray))",
          midGray: "hsl(var(--secondary-mid-gray))",
          darkGray: "hsl(var(--secondary-dark-gray))",
          purple: {
            DEFAULT: "hsl(var(--secondary-purple))",
            light: "hsl(var(--secondary-purple-light))",
          },
          red: {
            DEFAULT: "hsl(var(--secondary-red))",
            light: "hsl(var(--secondary-red-light))",
          },
          yellow: {
            DEFAULT: "hsl(var(--secondary-yellow))",
            light: "hsl(var(--secondary-yellow-light))",
          },
          blue: {
            DEFAULT: "hsl(var(--secondary-blue))",
            light: "hsl(var(--secondary-blue-light))",
          },
        },
        
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        popins:["var(--font-poppins)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value: any) => ({
          perspective: value,
        }),
      });
    }),
  ],
}
export default config;





// content: [
//   "./pages/**/*.{ts,tsx}",
//   "./components/**/*.{ts,tsx}",
//   "./app/**/*.{ts,tsx}",
//   "./src/**/*.{ts,tsx}",
// ],