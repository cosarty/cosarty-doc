import { navbar } from 'vuepress-theme-hope'

export default navbar([
  '/',
  {
    text: '框架',
    prefix: '/doc/framework/',
    icon: 'edit',
    children: [
      {
        text: 'vue3',
        link: 'vue3',
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
    ],
  },
  {
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
