import { Plugin, defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import { searchProPlugin } from 'vuepress-plugin-search-pro'
// import { blog } from 'vuepress-theme-hope';
import { viteBundler } from '@vuepress/bundler-vite'
import type {PluginOption } from 'vite'
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'cosarty',
  description: 'cosarty',
  base: '/',
  theme,
  shouldPrefetch: false,
  
  plugins: [
    docsearchPlugin({
   
      appId: 'BLZP92WBBB',

      apiKey: '13507d15ae775ecb848d0d5ff986b34a',
      // a9ac9c2e8adbe10f84ef2e43eb76d7dd
      indexName: 'cosarty',
      // 13507d15ae775ecb848d0d5ff986b34a

    }),
    // searchProPlugin({
    //   // 索引全部内容
    //   indexContent: true,
    //   // 为分类和标签添加索引
    //   customFields: [
    //     {
    //       name: "category",
    //       getter: (page) => page.frontmatter.category as string,
    //       formatter: "分类：$content",
    //     },
    //     {
    //       name: "tag",
    //       getter: (page) => page.frontmatter.tag as string,
    //       formatter: "标签：$content",
    //     },
    //   ],
    // }),
  ],
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        // {
        //   transformIndexHtml(row) {
        //     console.log('row: ', row);
        //     return row
        //     }
        // }as any 
      ]
    },
    vuePluginOptions: {},
  }),
  head: [
    // ['script', { src: '/tailwindcss.js' }],
  ],
  markdown:{
    headers:{
      level:[2,3,4]
    }
  }
})
