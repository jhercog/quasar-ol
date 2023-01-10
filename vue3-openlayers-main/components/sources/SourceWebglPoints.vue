<template>
  <div>
    <slot />
  </div>
</template>

<script>
import VectorSource from 'ol/source/Vector'

import {
  inject,
  watch,
  onMounted,
  onUnmounted,
  provide,
  computed
} from 'vue'

import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlSourceWebglpoints',
  props: {
    attributions: { type: [String, Array], default: undefined },
    features: { type: Array, default: () => [] },
    format: { type: Object, default: undefined },
    loader: { type: Function, default: undefined },
    overlaps: { type: Boolean, default: true },
    projection: { type: String, default: 'EPSG:3857' },
    strategy: { type: Function, default: undefined },
    url: { type: [String, Function], default: undefined },
    useSpatialIndex: { type: Boolean, default: true },
    wrapX: { type: Boolean, default: true }

  },
  setup (props) {
    const layer = inject('webglPointsLayer')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const source = computed(() => new VectorSource(properties))

    const applySource = () => {
      layer.value.setSource(null)
      layer.value.setSource(source.value)
      layer.value.changed()
    }
    watch(properties, () => {
      applySource()
    })

    watch(layer, () => {
      applySource()
    })

    onMounted(() => {
      layer.value.setSource(source.value)
    })

    onUnmounted(() => {
      layer.value.setSource(null)
    })

    provide('vectorSource', source)

    return {
      layer,
      source
    }
  }

}
</script>

<style lang="">

</style>
