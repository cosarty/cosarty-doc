import { navbar } from 'vuepress-theme-hope'

export default navbar([
  '/',
  {
    text: '框架',
    prefix: '/doc/framework/',
    icon: 'edit',
    children: [
      {
        text: 'vue',
        link: 'vue/vite-framework',
      },
      {
        text: 'react',
        link: 'react/immer不可变数据',
      },
    ],
  },
  // {
  //   text: '随笔',
  //   prefix: '/doc/essay/',
  //   children: [],
  // },
  {
    text: '食用手册',
    prefix: '/doc/essay/handbook/',
    children: [
      'scss',
      'nestjs-frame',
      'vite-plugin',
      'npm-common-packge',
      'nginx',
    ],
  },
  {
    text: '面经',
    prefix: '/interview',
    link: '/doc/interview',
  },
  {
    text: '杂七杂八',
    prefix: '/doc/essay/mixed/',
    children: ['mobile', 'js-skill','css-skill','css-specific'],
  },
  {
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
