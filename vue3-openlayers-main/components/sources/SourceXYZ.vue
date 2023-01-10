<template>
  <div v-if="false" />
</template>

<script>
import XYZ from 'ol/source/XYZ'
import {
  inject,
  watch,
  onMounted,
  onUnmounted,
  computed
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlSourceXyz',
  props: {
    attributions: { type: [String, Array], default: undefined },
    url: { type: String, default: undefined },
    cacheSize: { type: Number, default: 2048 },
    crossOrigin: { type: String, default: undefined },
    maxZoom: { type: Number, default: 28 },
    minZoom: { type: Number, default: 0 },
    opaque: { type: Boolean, default: undefined },
    projection: { type: String, default: 'EPSG:3857' },
    reprojectionErrorThreshold: { type: Number, default: 0.5 },
    tileSize: { type: Array, default: () => [256, 256] },
    tilePixelRatio: { type: Number, default: 1 },
    tileKey: { type: String, default: undefined },
    transition: { type: Number, default: undefined },
    tileGrid: { type: Object, default: undefined }
  },
  setup (props) {
    const layer = inject('tileLayer')
    const {
      properties
    } = usePropsAsObjectProperties(props)

    const source = computed(() => new XYZ(properties))

    watch(source, () => {
      layer.value.setSource(source.value)
    })

    watch(layer, () => {
      layer.value.setSource(source.value)
    })
    onMounted(() => {
      layer.value.setSource(source.value)
    })

    onUnmounted(() => {
      layer.value.setSource(null)
    })

    return {
      layer,
      source
    }
  }
}
</script>

<style lang="">

</style>
