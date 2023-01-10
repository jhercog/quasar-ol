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

import VectorLayer from 'ol/layer/Vector'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

import BaseLayer from './BaseLayer.vue'
export default {
  name: 'OlVectorLayer',
  extends: BaseLayer,
  props: {
    renderBuffer: { type: Number, default: 100 },
    updateWhileAnimating: { type: Boolean, default: false },
    style: { type: Function, default: undefined },
    updateWhileInteracting: { type: Boolean, default: false }
  },
  setup (props) {
    const map = inject('map')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const vectorLayer = computed(() => new VectorLayer(properties))

    watch(properties, () => {
      vectorLayer.value.setProperties(properties)
    })

    onMounted(() => {
      map.addLayer(vectorLayer.value)
    })

    onUnmounted(() => {
      map.removeLayer(vectorLayer.value)
    })

    provide('vectorLayer', vectorLayer)
    provide('stylable', vectorLayer)

    return {
      vectorLayer
    }
  }
}
</script>

<style lang="">

</style>
