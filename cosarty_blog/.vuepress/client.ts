// .vuepress/client.ts
import { defineClientConfig } from 'vuepress/client'
import components from './components'

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    for (const component of components) {
      if (component.name) {
        app.component(component.name, component)
      }
    }
  },
})
