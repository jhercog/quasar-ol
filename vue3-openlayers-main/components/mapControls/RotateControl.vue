<template lang="">
  <div v-if="false" />
</template>

<script>
import useControl from 'vue3Ol/composables/useControl'
import Rotate from 'ol/control/Rotate'

export default {
  name: 'OlRotateControl',
  props: {
    className: { type: String, default: 'ol-rotate' },
    label: {
      type: [String, Function, HTMLElement],
      default: () => document.createElement('i').classList.add('mdi', 'mdi-navigation')
    },
    tipLabel: { type: String, default: 'Reset rotation (shift+alt+drag to rotate)' },
    compassClassName: { type: String, default: 'ol-compass' },
    duration: { type: Number, default: 250 },
    autoHide: { type: Boolean, default: false },
    render: { type: Function, default: undefined },
    resetNorth: { type: Function, default: undefined },
    target: { type: HTMLElement, default: undefined }
  },
  setup (props, context) {
    const { control } = useControl(Rotate, props, context)

    return { control }
  }
}
</script>

<style lang="">

</style>
