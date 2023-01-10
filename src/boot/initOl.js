import { boot } from 'quasar/wrappers'
import ol from 'vue3-openlayers'
// import 'vue3-openlayers/dist/vue3-openlayers.css'
// import ol from 'vue3Ol'
// import 'vue3Ol/assets/style.css'

export default boot(async ({ app }) => {
  app.use(ol)
})
