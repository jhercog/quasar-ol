<template>
  <div>
    <slot />
  </div>
</template>

<script>
import {
  Cluster
} from 'ol/source'

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
  name: 'OlSourceCluster',
  props: {
    attributions: { type: [String, Array], default: undefined },
    distance: { type: Number, default: 20 },
    geometryFunction: { type: Function, default: (feature) => feature.getGeometry() },
    wrapX: { type: Boolean, default: true }

  },
  setup (props) {
    const layer = inject('vectorLayer')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const source = computed(() => {
      const c = new Cluster(properties)
      return c
    })

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
      layer.value.changed()
    })

    onUnmounted(() => {
      layer.value.setSource(null)
    })

    provide('vectorLayer', source)

    return {
      layer,
      source
    }
  }

}
</script>

<style lang="">

</style>
