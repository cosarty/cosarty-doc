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
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
