<template lang="">
  <div>
    <slot />
  </div>
</template>

<script>
import {
  inject,
  provide,
  onUnmounted,
  onMounted,
  watch
} from 'vue'

import ImageLayer from 'ol/layer/Image'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'
import BaseLayer from './BaseLayer.vue'
export default {
  name: 'OlImageLayer',
  extends: BaseLayer,
  setup (props) {
    const map = inject('map')
    const {
      properties
    } = usePropsAsObjectProperties(props)

    const imageLayer = new ImageLayer(properties)

    watch(properties, () => {
      imageLayer.setProperties(properties)
    })

    onMounted(() => {
      map.addLayer(imageLayer)
    })

    onUnmounted(() => {
      map.removeLayer(imageLayer)
    })

    provide('imageLayer', imageLayer)

    return {
      imageLayer
    }
  }
}
</script>

<style lang="">

</style>
