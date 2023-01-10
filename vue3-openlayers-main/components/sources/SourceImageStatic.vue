<template>
  <div v-if="false" />
</template>

<script>
import Static from 'ol/source/ImageStatic'
import Projection from 'ol/proj/Projection'

import {
  inject,
  onMounted,
  onUnmounted,
  watch
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlSourceImageStatic',
  props: {
    attributions: { type: String, default: undefined },
    crossOrigin: { type: String, default: undefined },
    imageExtent: { type: Array, default: undefined },
    projection: { type: [String, Object], default: undefined },
    imageSmoothing: { type: Boolean, default: true },
    imageSize: { type: Array, default: undefined },
    url: { type: String, default: undefined }
  },
  setup (props) {
    const layer = inject('imageLayer')
    const {
      properties
    } = usePropsAsObjectProperties(props)

    const createSource = () => {
      return new Static({
        ...properties,
        projection: typeof properties.projection === 'string' ? properties.projection : new Projection({
          ...properties.projection
        })
      })
    }

    let source = createSource()

    watch(properties, () => {
      layer.setSource(null)
      source = createSource()
      layer.setSource(source)
    })
    onMounted(() => {
      layer.setSource(source)
    })

    onUnmounted(() => {
      layer.setSource(null)
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
