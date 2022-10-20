import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/doc/framework/vue': ['vue3'],
  '/doc/framework/react': ['immer不可变数据'],
  '/doc/deploy/': [
    {
      text: 'nginx',
      link: 'nginx',
    },
  ],
  '/doc/essay/': [
    {
      text: 'npm发包指南',
      link: 'npm-publish-guide',
    },
  ],
})
