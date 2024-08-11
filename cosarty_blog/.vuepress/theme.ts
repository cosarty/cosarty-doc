import { hopeTheme } from 'vuepress-theme-hope';
import navbar from './navbar.js';
import sidebar from './sidebar.js';
import { NOTES_PASS } from './constants';

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
      ai工具: [
        '/aiTools',
        `<svg t="1723370748646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2611" width="200" height="200"><path d="M923.136 969.557333H193.024v-909.653333h521.386667l208.725333 207.701333z" fill="#7CCDFF" p-id="2612"></path><path d="M912.896 253.952l2.56 671.914667c0 15.530667-12.458667 27.989333-27.989333 27.989333H237.909333c-15.530667 0-27.989333-12.458667-27.989333-27.989333V96.938667c0-15.530667 12.458667-27.989333 27.989333-27.989334l493.397334-1.024-38.912-39.936H239.274667c-36.352 0-65.706667 29.354667-65.706667 65.706667v835.584c0 36.352 29.354667 65.706667 65.706667 65.706667h646.826666c36.352 0 65.706667-29.354667 65.706667-65.706667V293.888l-38.912-39.936z" fill="#4191FB" p-id="2613"></path><path d="M692.394667 222.72c0 39.424 31.914667 71.338667 71.338666 71.338667h188.245334L692.394667 27.989333v194.730667z" fill="#C7E2FF" p-id="2614"></path><path d="M557.568 482.304H158.72c-50.346667 0-91.136-40.789333-91.136-91.136v-60.245333c0-50.346667 40.789333-91.136 91.136-91.136h398.848c50.346667 0 91.136 40.789333 91.136 91.136v60.245333c0 50.346667-40.789333 91.136-91.136 91.136z" fill="#4191FB" p-id="2615"></path><path d="M342.016 417.621333h-54.613333l-7.509334 25.770667h-49.152l58.538667-155.818667h52.565333l58.538667 155.818667H349.866667l-7.850667-25.770667z m-9.898667-33.792l-17.237333-55.978666-17.066667 55.978666h34.304zM417.450667 287.573333h48.298666v155.818667h-48.298666v-155.818667z" fill="#FFFFFF" p-id="2616"></path><path d="M566.272 767.317333c-2.56-7.509333-4.949333-15.189333-4.949333-23.210666-0.170667-26.624 24.064-47.786667 46.08-64.682667 6.656-5.12 13.482667-10.24 21.504-12.8 11.093333-3.413333 23.04-1.024 34.474666-1.877333 18.090667-1.365333 34.645333-10.24 51.541334-17.066667 28.842667-11.605333 59.904-17.408 90.624-16.896 15.872 40.618667 2.048 86.869333 4.266666 130.730667 1.194667 23.893333 7.168 47.104 8.362667 70.826666 0.170667 3.413333 0.170667 6.826667-1.024 10.069334-2.901333 8.021333-11.946667 12.288-20.138667 15.701333-39.424 16.213333-78.848 32.426667-118.101333 48.810667-5.632 2.218667-11.434667 4.608-17.408 4.608-23.381333-0.512-40.96-39.082667-51.370667-54.954667-18.261333-27.989333-33.109333-57.856-43.861333-89.258667z" fill="#4191FB" p-id="2617"></path><path d="M818.005333 863.232c6.485333-3.242667 13.141333-6.826667 17.066667-12.8 4.608-6.997333 4.096-15.872 3.072-23.893333-3.242667-24.917333-10.752-49.152-11.093333-74.410667-0.512-32.768 11.093333-66.218667 3.754666-97.962667 24.576 50.346667 20.48 110.08 37.888 163.157334 3.072 9.216 6.826667 18.602667 6.144 28.501333-1.024 14.506667-11.776 27.306667-24.576 35.328-12.970667 8.021333-27.989333 11.946667-42.666666 15.701333-36.693333 9.386667-73.386667 18.773333-110.08 28.330667 30.037333-29.696 82.261333-42.666667 120.490666-61.952z" fill="#4191FB" p-id="2618"></path><path d="M939.349333 596.309333H459.946667c-5.973333 0-10.752-4.778667-10.752-10.752v-2.048c0-5.973333 4.778667-10.752 10.752-10.752h479.402666c5.973333 0 10.752 4.778667 10.752 10.752v2.048c0 5.802667-4.778667 10.752-10.752 10.752z" fill="#4191FB" p-id="2619"></path><path d="M530.773333 531.114667v448c0 5.973333-4.778667 10.752-10.752 10.752h-2.048c-5.973333 0-10.752-4.778667-10.752-10.752V531.114667c0-5.973333 4.778667-10.752 10.752-10.752h2.048c5.802667 0 10.752 4.778667 10.752 10.752z" fill="#4191FB" p-id="2620"></path></svg>`,
      ],
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
});
