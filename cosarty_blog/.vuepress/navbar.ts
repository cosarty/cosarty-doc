/*
 * @Descripttion:
 * @version:
 * @Author: Andy
 * @Date: 2023-06-08 21:44:21
 * @LastEditors: Andy
 * @LastEditTime: 2023-10-08 21:42:01
 */
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
        link: 'vue/20230107-vite-framework',
      },
      {
        text: 'react',
        link: 'react/immer不可变数据',
      },
      {
        text: 'nodejs',
        link: 'nodejs/child_process',
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
      'linux-book',
      'git-review',
      {
        link: 'tailwindcss/1.setup.md',
        text: 'tailwindcss',
      },
      {
        link: 'nextjs/1.setup.md',
        text: 'nextjs',
      },
      {
        link: 'electron/1.setup.md',
        text: 'electron',
      },
      'swc',
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
    children: [
      'mobile',
      'css-skill',
      'css-specific',
      {
        link: 'js-check-for-gaps/20230904-ResizeObserver',
        text: 'js 查缺补漏',
      },
    ],
  },
  {
    text: '关于',
    icon: 'people',
    link: '/about/',
  },
])
