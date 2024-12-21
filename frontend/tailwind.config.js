/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // 确保包含你的 Vue 文件
    './public/**/*.html', // 如果需要扫描 HTML 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",]
  }
}

