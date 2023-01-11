<template />

<script>
import Swipe from 'ol-ext/control/Swipe'
import useControl from 'vue3Ol/composables/useControl'
import { toRefs } from 'vue'

export default {
  name: 'OlSwipeControl',
  props: {
    layerList: { type: Array, default: undefined },
    className: { type: String, default: 'ol-swipe' },
    position: { type: Number, default: 0.5 },
    orientation: { type: String, default: 'vertical' }
  },
  setup (props, context) {
    const { control } = useControl(Swipe, props, context)

    const { layerList } = toRefs(props)

    console.log(control.value.listenerKeys)

    layerList.value.forEach((layer, index) => {
      control.value.addLayer(layer, index === 1)
    })

    return { control }
  }
}
</script>
