/*
 * @Descripttion:
 * @version:
 * @Author: Andy
 * @Date: 2023-06-08 21:44:21
 * @LastEditors: Andy
 * @LastEditTime: 2023-10-08 21:41:37
 */
import { sidebar } from 'vuepress-theme-hope';

export default sidebar({
  '/doc/framework/vue': 'structure',
  '/doc/framework/nodejs': 'structure',
  '/doc/framework/react': [
    'immer不可变数据',
    'life-cycle',
    '20230902-常用hook',
  ],
  '/doc/essay/mixed': [
    'mobile',
    // 'js-skill',
    'css-skill',
    'css-specific',

    {
      link: 'js-check-for-gaps/20230904-ResizeObserver',
      text: 'js 查缺补漏',
    },
  ],
  // 重新开一行是为了重新渲染侧边栏
  '/doc/essay/mixed/js-check-for-gaps': 'structure',
  '/doc/essay/handbook': [
    'scss',
    'nestjs-frame',
    'vite-plugin',
    'npm-common-packge',
    'nginx',
    {
      link: 'linux/1.other.md',
      text: '笔记',
    },
    'git-review',
    {
      link: 'tailwindcss/1.setup',
      text: 'tailwindcss',
    },
    {
      link: 'nextjs/1.setup',
      text: 'nextjs',
    },
    'swc',
    'esbuild',
    {
      link: 'prisma/1.quickStart',
      text: 'prisma',
    },
  ],
  // 重新开一行是为了重新渲染侧边栏
  '/doc/essay/handbook/tailwindcss': [
    '1.setup',
    '2.pseudoClass',
    '3.responsive',
  ],
  '/doc/essay/handbook/linux': ['1.other', '2.journalctl'],
  '/doc/essay/handbook/prisma': [
    '1.quickStart',
    '2.prismaSchema',
    '3.prismaClient',
  ],
  '/doc/essay/handbook/nextjs': ['1.setup'],
  '/doc/essay/handbook/electron': [
    '1.setup',
    '2.screenRecording',
    '3.inputDevices',
  ],
  '/doc/interview': [
    {
      text: 'css',
      link: 'css',
    },
    {
      text: 'html',
      link: 'html',
    },
    {
      text: 'javascript',
      link: 'javascript',
    },
    {
      text: 'react',
      link: 'react',
    },
    {
      text: 'vue',
      link: 'vue',
    },
    {
      text: 'ts',
      link: 'ts',
    },
  ],
});
