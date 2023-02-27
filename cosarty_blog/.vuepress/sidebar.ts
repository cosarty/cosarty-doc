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

  '/doc/essay/npm-publish-guide': 'structure',
  '/doc/essay/mixed': ['mobile', 'js-skill'],
  '/doc/essay/handbook': 'structure',
})
