import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/doc/framework/': [
    {
      text: 'vue3',
      icon: 'generic',
      link: 'vue3',
    },
  ],
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
