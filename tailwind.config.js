/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./cosarty_blog/.vuepress/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,  //取消基础样式覆盖
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}
