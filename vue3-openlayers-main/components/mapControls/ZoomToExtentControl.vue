<template lang="">
  <div v-if="false" />
</template>

<script>
import useControl from 'vue3Ol/composables/useControl'

import ZoomToExtent from 'ol/control/ZoomToExtent'

export default {
  name: 'OlZoomtoextentControl',
  props: {
    className: { type: String, default: 'ol-zoom-extent' },
    target: { type: HTMLElement, default: undefined },
    label: { type: String, default: 'E' },
    tipLabel: { type: String, default: 'Fit to extent' },
    extent: { type: Array, default: undefined }
  },
  setup (props, context) {
    const {
      control
    } = useControl(ZoomToExtent, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
