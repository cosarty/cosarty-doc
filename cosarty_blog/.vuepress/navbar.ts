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
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
