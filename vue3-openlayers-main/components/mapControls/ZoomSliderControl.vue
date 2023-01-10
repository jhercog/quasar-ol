<template lang="">
  <div v-if="false" />
</template>

<script>
import useControl from 'vue3Ol/composables/useControl'
import ZoomSlider from 'ol/control/ZoomSlider'

export default {
  name: 'OlZoomsliderControl',
  props: {
    duration: { type: Number, default: 200 },
    className: { type: String, default: 'ol-zoomslider' },
    render: { type: Function, default: undefined }
  },
  setup (props, context) {
    const {
      control
    } = useControl(ZoomSlider, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
