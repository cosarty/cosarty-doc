import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/doc/framework/vue': 'structure',
  '/doc/framework/react': ['immer不可变数据', 'life-cycle'],
  '/doc/deploy/': [
    {
      text: 'nginx',
      link: 'nginx',
    },
  ],

  '/doc/essay/npm-common-packge': 'structure',
  '/doc/essay/mixed': ['mobile', 'js-skill','css-skill','css-specific'],
  '/doc/essay/handbook': 'structure',
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
  ],
})
