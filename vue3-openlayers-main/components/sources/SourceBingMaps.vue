<template>
  <div v-if="false" />
</template>

<script>
import BingMaps from 'ol/source/BingMaps'
import {
  inject,
  watch,
  onMounted,
  onUnmounted,
  computed
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlSourceBingmaps',
  props: {

    cacheSize: { type: Number, default: undefined },
    hidpi: { type: Boolean, default: false },
    culture: { type: String, default: 'en-us' },
    apiKey: { type: String, default: undefined },
    imagerySet: { type: String, default: undefined },
    imageSmoothing: { type: Boolean, default: true },
    maxZoom: { type: Number, default: 21 },
    reprojectionErrorThreshold: { type: Number, default: 0.5 },
    tileLoadFunction: { type: Function, default: (imageTile, src) => (imageTile.getImage().src = src) },
    wrapX: { type: Boolean, default: true },
    transition: { type: Number, default: undefined }

  },
  setup (props) {
    const layer = inject('tileLayer')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const source = computed(() => new BingMaps({
      ...properties,
      key: properties.apiKey
    }))

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
