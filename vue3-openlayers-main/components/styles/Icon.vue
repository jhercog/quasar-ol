<template>
  <div v-if="false" />
</template>

<script>
import Icon from 'ol/style/Icon'

import {
  inject,
  watch,
  onMounted,
  onUnmounted,
  computed
} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlStyleIcon',
  props: {
    anchor: { type: Array, default: undefined },
    anchorOrigin: { type: String, default: 'top-left' },
    anchorXUnits: { type: String, default: 'fraction' },
    color: { type: String, default: undefined },
    crossOrigin: { type: String, default: undefined },
    img: { type: [HTMLImageElement, HTMLCanvasElement], default: undefined },
    offset: { type: Array, default: () => [0, 0] },
    displacement: { type: Array, default: () => [0, 0] },
    offsetOrigin: { type: String, default: 'top-left' },
    opacity: { type: Number, default: 1 },
    scale: { type: Number, default: 1 },
    rotateWithView: { type: Boolean, default: false },
    rotation: { type: Number, default: 0 },
    size: { type: Array, default: undefined },
    imgSize: { type: Array, default: undefined },
    src: { type: String, default: undefined }
  },
  setup (props) {
    const style = inject('style', null)
    const styledObj = inject('styledObj', null)

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const icon = computed(() => {
      const ic = new Icon(properties)
      ic.load()
      return ic
    })

    const applyStyle = () => {
      style.value.setImage(null)
      style.value.setImage(icon.value)
      styledObj.value.changed()
    }

    watch(properties, () => {
      applyStyle()
    })

    watch(style, () => {
      applyStyle()
    })

    onMounted(() => {
      style.value.setImage(icon.value)
    })

    onUnmounted(() => {
      style.value.setImage(null)
    })
  }

}
</script>

<style lang="">

</style>
