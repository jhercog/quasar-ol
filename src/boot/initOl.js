import { boot } from 'quasar/wrappers'
// import ol from 'vue3-openlayers'
import ol from 'vue3Ol'

export default boot(async ({ app }) => {
  app.use(ol)
})
