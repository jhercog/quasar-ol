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

import TileLayer from 'ol/layer/Tile'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'
import BaseLayer from './BaseLayer.vue'
export default {
  name: 'OlTileLayer',
  extends: BaseLayer,
  props: {
    preload: { type: Number, default: 1 }
  },
  setup (props) {
    const map = inject('map')
    const overViewMap = inject('overviewMap', null)

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const tileLayer = computed(() => new TileLayer(properties))

    const applyTileLayer = () => {
      if (overViewMap != null) {
        overViewMap.value.getOverviewMap().addLayer(tileLayer.value)
        overViewMap.value.changed()
      } else {
        map.addLayer(tileLayer.value)
      }
    }

    const removeTileLayer = () => {
      if (overViewMap != null) {
        overViewMap.value.getOverviewMap().removeLayer(tileLayer.value)
        overViewMap.value.changed()
      } else {
        map.removeLayer(tileLayer.value)
      }
    }

    if (overViewMap != null) {
      watch(overViewMap, () => {
        removeTileLayer()
        applyTileLayer()
      })
    }

    onMounted(() => {
      applyTileLayer()
    })

    onUnmounted(() => {
      removeTileLayer()
    })

    provide('tileLayer', tileLayer)

    return {
      tileLayer
    }
  }
}
</script>

<style lang="">

</style>
