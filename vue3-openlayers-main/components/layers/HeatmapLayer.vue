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

import HeatmapLayer from 'ol/layer/Heatmap'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

import BaseLayer from './BaseLayer.vue'
export default {
  name: 'OlHeatmapLayer',
  extends: BaseLayer,
  props: {
    weight: { type: Function, default: undefined },
    extent: { type: Array, default: undefined },
    blur: { type: Number, default: undefined },
    radius: { type: Number, default: undefined }
  },
  setup (props) {
    const map = inject('map')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const heatmapLayer = computed(() => new HeatmapLayer(properties))

    watch(properties, () => {
      heatmapLayer.value.setProperties(properties)
    })

    onMounted(() => {
      map.addLayer(heatmapLayer.value)
    })

    onUnmounted(() => {
      map.removeLayer(heatmapLayer.value)
    })

    provide('heatmapLayer', heatmapLayer)
    provide('stylable', heatmapLayer)

    return {
      heatmapLayer
    }
  }
}
</script>

<style lang="">

</style>
