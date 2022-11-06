import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import sidebar from './sidebar.js'
import { NOTES_PASS } from './constants'

export default hopeTheme({
  // hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: 'cosarty',
    // url: "https://mrhope.site",
  },

  iconAssets: 'iconfont',

  logo: '/cxn.png',

  // git地址
  repo: 'cosarty',
  docsBranch: 'master',
  docsRepo: 'cosarty/cosarty-doc',
  docsDir: 'cosarty_blog',
  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,
  fullscreen: true,
  // footer: "默认页脚",
  darkmode: 'toggle',
  displayFooter: true,

  pageInfo: [
    'Author',
    'Original',
    'Date',
    'Category',
    'Tag',
    // 'ReadingTime',
    'PageView',
  ],

  blog: {
    description: '一个前端开发者',
    intro: '/about',
    medias: {
      Email: '1398675906@qq.com',
    },
  },

  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    blog: {
      autoExcerpt: true,
      filter: (page) =>
        NOTES_PASS.some((reg) => reg.test(page.filePathRelative || '')) &&
        !page.frontmatter.home,
    },
    copyCode: {
      showInMobile: true,
      duration: 1000,
    },
    comment: false,
    // {

    /**
     * Using Giscus
     */
    // provider: "Giscus",
    // repo: "vuepress-theme-hope/giscus-discussions",
    // repoId: "R_kgDOG_Pt2A",
    // category: "Announcements",
    // categoryId: "DIC_kwDOG_Pt2M4COD69",

    /**
     * Using Twikoo
     */
    // provider: "Twikoo",
    // envId: "https://twikoo.ccknbc.vercel.app",

    /**
     * Using Waline
     */
    // provider: "Waline",
    // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },
    // pwa: {
    //   favicon: '/favicon.ico',
    // },
    mdEnhance: {
      lazyLoad: true,
      tabs: true,
      codetabs: true,
    },
    photoSwipe: {},
  },
})
