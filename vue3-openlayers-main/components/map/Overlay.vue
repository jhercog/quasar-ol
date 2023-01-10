<template lang="">
  <div ref="htmlContent">
    <slot :position="position" />
  </div>
</template>

<script>
import useOverlay from 'vue3Ol/composables/useOverlay'
export default {
  name: 'OlOverlay',
  props: {
    position: { type: Array, default: undefined },
    offset: { type: Array, default: undefined },
    positioning: { type: String, default: undefined },
    stopEvent: { type: Boolean, default: true },
    insertFirst: { type: Boolean, default: true },
    autoPan: { type: Boolean, default: false },
    autoPanMargin: { type: Number, default: 20 },
    autoPanAnimation: { type: Object, default: undefined }
  },
  setup (props, { emit }) {
    const overlay = new useOverlay(props, emit) // eslint-disable-line

    return {
      ...overlay
    }
  }
}
</script>

<style lang="">

</style>
