<template>
  <div v-if="false" />
</template>

<script>
import WMTS from 'ol/source/WMTS'
import Projection from 'ol/proj/Projection'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import {
  get as getProjection
} from 'ol/proj'
import {
  getTopLeft,
  getWidth
} from 'ol/extent'
import {
  inject,
  onMounted,
  onUnmounted,
  watch,
  computed
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'
export default {
  name: 'OlSourceWmts',
  props: {
    tileZoomLevel: { type: Number, default: 30 },
    attributions: { type: String, default: undefined },
    cacheSize: { type: Number, default: undefined },
    crossOrigin: { type: String, default: undefined },
    imageSmoothing: { type: Boolean, default: true },
    projection: { type: [String, Object], default: 'EPSG:3857' },
    reprojectionErrorThreshold: { type: Number, default: 0.5 },
    tilePixelRatio: { type: Number, default: 1 },
    format: { type: String, default: 'image/jpeg' },
    version: { type: String, default: '1.0.0' },
    matrixSet: { type: String, default: undefined },
    dimensions: { type: Object, default: undefined },
    requestEncoding: { type: String, default: 'KVP' },
    url: { type: String, default: undefined },
    urls: { type: Array, default: undefined },
    wrapX: { type: Boolean, default: false },
    transition: { type: Number, default: undefined },
    layer: { type: String, default: undefined },
    style: { type: String, default: undefined }
  },
  setup (props) {
    const tileLayer = inject('tileLayer')
    const {
      properties
    } = usePropsAsObjectProperties(props)

    const extent = computed(() => getProjection(properties.projection).getExtent())
    const origin = computed(() => getTopLeft(extent.value))
    const size = computed(() => getWidth(extent.value) / 256)

    const getTileGrid = computed(() => {
      const resolutions = new Array(properties.tileZoomLevel)
      const matrixIds = new Array(properties.tileZoomLevel)

      for (let z = 0; z < properties.tileZoomLevel; ++z) {
        resolutions[z] = size.value / Math.pow(2, z)
        matrixIds[z] = z
      }

      return new WMTSTileGrid({
        origin: origin.value,
        resolutions,
        matrixIds
      })
    })

    const source = computed(() => new WMTS({
      ...properties,
      projection: typeof properties.projection === 'string' ? properties.projection : new Projection({
        ...properties.projection
      }),
      tileGrid: getTileGrid.value
    }))

    watch(source, () => {
      tileLayer.value.setSource(source.value)
    })

    watch(tileLayer, () => {
      tileLayer.value.setSource(source.value)
    })

    onMounted(() => {
      tileLayer.value.setSource(source.value)
    })

    onUnmounted(() => {
      tileLayer.value.setSource(null)
    })

    return {
      tileLayer,
      source
    }
  }
}
</script>

<style lang="">

</style>
