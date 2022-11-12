import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'cosarty',
  description: 'cosarty',
  base: '/',
  theme,
  shouldPrefetch: false,
  plugins: [
    // docsearchPlugin({
    // }),
  ],
})
