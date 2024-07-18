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
  // darkmode: 'auto',
  darkmode: 'switch',
  displayFooter: true,

  pageInfo: [
    'Author',
    'Original',
    'Date',
    'Category',
    'Tag',
    'ReadingTime',
    // 'PageView',
  ],

  blog: {
    description: '一个前端开发者',
    // intro: '/about',
    intro: '/',
    medias: {
      Email: '1398675906@qq.com',
    },
    timeline: '时间轴',
  },

  encrypt: {
    config: {
      '/posts/worksheet/collect.html': ['1398675906'],
    },
  },

  plugins: {
    blog: {
      // autoExcerpt: true,
      excerptLength: 0,
      filter: (page) =>
        NOTES_PASS.some((reg) => reg.test(page.filePathRelative || '')) &&
        !page.frontmatter.home,
    },
    copyCode: {
      showInMobile: true,
      duration: 1000,
    },
    comment: {
      provider: 'Giscus',
      repo: 'cosarty/cosarty-doc',
      repoId: 'R_kgDOH-iC9w',
      category: 'Announcements',
      categoryId: 'DIC_kwDOH-iC984CShBG',
    },

    // pwa: {
    //   favicon: '/favicon.ico',
    // },
    mdEnhance: {
      // lazyLoad: true,
      tabs: true,
      codetabs: true,
      demo: true,
      vuePlayground: true,
    },
    photoSwipe: {},
  },
})
