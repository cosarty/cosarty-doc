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
        link: 'vue/vue3',
      },
      {
        text: 'react',
        link: 'react/immer不可变数据',
      },
    ],
  },
  {
    text: '部署',
    prefix: '/doc/deploy/',
    children: [
      {
        text: 'nginx',
        link: 'nginx',
      },
    ],
  },
  {
    text: '随笔',
    prefix: '/doc/essay/',
    children: [
      {
        text: 'npm发包指南',
        link: 'npm-publish-guide',
      },
      {
        text: '杂七杂八',
        link: 'mixed/mobile',
      },
    ],
  },
  {
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
