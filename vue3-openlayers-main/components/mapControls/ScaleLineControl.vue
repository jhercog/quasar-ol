<template lang="">
  <div v-if="false" />
</template>

<script>
import useControl from 'vue3Ol/composables/useControl'

import {
  ScaleLine
} from 'ol/control'

export default {
  name: 'OlScalelineControl',
  props: {
    className: { type: String, default: 'ol-scale-line' },
    minWidth: { type: Number, default: 64 },
    render: { type: Function, default: undefined },
    target: { type: HTMLElement, default: undefined },
    units: { type: String, default: 'metric' },
    bar: { type: Boolean, default: false },
    steps: { type: Number, default: 4 },
    text: { type: Boolean, default: false },
    dpi: { type: Number, default: undefined }

  },
  setup (props, context) {
    const {
      control
    } = useControl(ScaleLine, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
