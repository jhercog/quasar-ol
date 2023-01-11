<template>
  <div v-if="false" />
</template>

<script>
import TileImage from 'ol/source/XYZ'
import {
  inject,
  watch,
  onMounted,
  onUnmounted,
  computed
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlSourceImage',
  props: {
    attributions: { type: [String, Array], default: undefined },
    attributionsCollapsible: { type: Boolean, default: true },
    cacheSize: { type: Number, default: 2048 },
    crossOrigin: { type: String, default: undefined },
    interpolate: { type: Boolean, default: true },
    opaque: { type: Boolean, default: false },
    projection: { type: String, default: 'EPSG:3857' },
    reprojectionErrorThreshold: { type: Number, default: 0.5 },
    // state: { type: Number, default: 0.5 },
    // tileClass: { type: Class, default: 0.5 },
    tileGrid: { type: Object, default: undefined },
    // tileLoadFunction: { type: Function, default: undefined }
    tilePixelRatio: { type: Number, default: 1 },
    // tileUrlFunction: { type: Function, default: undefined }

    url: { type: String, default: undefined },
    urls: { type: Array, default: undefined },
    transition: { type: Number, default: undefined },
    // key: { type: Number, default: undefined },
    zDirection: { type: [Number, Function], default: undefined },

    tileSize: { type: Array, default: () => [256, 256] },
    tileKey: { type: String, default: undefined }
  },
  setup (props) {
    const layer = inject('tileLayer')
    const { properties } = usePropsAsObjectProperties(props)

    const source = computed(() => new TileImage(properties))

    watch(source, () => {
      source.value.setTileGridForProjection(props.projection, props.tileGrid)
      layer.value.setSource(source.value)
    })

    watch(layer, () => {
      source.value.setTileGridForProjection(props.projection, props.tileGrid)
      layer.value.setSource(source.value)
    })
    onMounted(() => {
      source.value.setTileGridForProjection(props.projection, props.tileGrid)
      layer.value.setSource(source.value)
    })

    onUnmounted(() => {
      layer.value.setSource(null)
    })

    return { layer, source }
  }
}
</script>
