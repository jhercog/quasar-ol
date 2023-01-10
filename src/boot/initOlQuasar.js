import { boot } from 'quasar/wrappers'

export default boot(async ({ app }) => {
  const olComponents = {
    OlMap: await import('olQuasar/components/map/OlMap.vue'),
    OlView: await import('olQuasar/components/map/OlView.vue'),
    OlTileLayer: await import('olQuasar/components/layers/OlTileLayer.vue'),
    OlSourceOsm: await import('olQuasar/components/sources/OlSourceOSM.vue')
  }

  for (const key in olComponents) {
    app.component(key, olComponents[key].default)
    app.provide(key, olComponents[key].default)
  }
})
