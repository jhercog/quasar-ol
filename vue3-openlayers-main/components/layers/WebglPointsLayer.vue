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
  watch,
  computed
} from 'vue'

import WebGLPointsLayer from 'ol/layer/WebGLPoints'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

import BaseLayer from './BaseLayer.vue'
export default {
  name: 'OlWebglpointsLayer',
  extends: BaseLayer,
  props: {
    disableHitDetection: { type: Boolean, default: false },
    style: {
      type: Object,
      default: () => ({
        symbol: {
          symbolType: 'circle',
          size: 8,
          color: '#33AAFF',
          opacity: 0.9
        }
      })
    }
  },
  setup (props) {
    const map = inject('map')
    const {
      properties
    } = usePropsAsObjectProperties(props)
    const webglPointsLayer = computed(() => new WebGLPointsLayer(properties))
    watch(properties, () => {
      webglPointsLayer.value.setProperties(properties)
    })
    onMounted(() => {
      map.addLayer(webglPointsLayer.value)
    })
    onUnmounted(() => {
      map.removeLayer(webglPointsLayer.value)
    })
    provide('webglPointsLayer', webglPointsLayer)
    return {
      webglPointsLayer
    }
  }
}
</script>

<style lang="">

</style>
