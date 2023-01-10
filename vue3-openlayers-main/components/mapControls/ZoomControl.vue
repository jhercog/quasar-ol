<template lang="">
  <div v-if="false" />
</template>

<script>
import Zoom from 'ol/control/Zoom'
import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlZoomControl',
  props: {
    duration: { type: Number, default: 250 },
    className: { type: String, default: 'ol-zoom' },
    zoomInClassName: { type: String, default: 'ol-zoom-in' },
    zoomOutClassName: { type: String, default: 'ol-zoom-out' },
    zoomInLabel: { type: String, default: '+' },
    zoomOutLabel: { type: String, default: '-' },
    zoomInTipLabel: { type: String, default: 'Zoom in' },
    zoomOutTipLabel: { type: String, default: 'Zoom Out' },
    delta: { type: Number, default: 1 },
    target: { type: HTMLElement, default: undefined }

  },
  setup (props, context) {
    const {
      control
    } = useControl(Zoom, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
