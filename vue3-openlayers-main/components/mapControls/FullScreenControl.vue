<template>
  <component :is="control" />
</template>

<script>
export default { name: 'OlFullscreenControl' }
</script>

<script setup>
import { useAttrs, useSlots, getCurrentInstance } from 'vue' // eslint-disable-line
import { FullScreen } from 'ol/control'
import useControl from 'vue3Ol/composables/useControl'

const attrs = useAttrs()
const slots = useSlots() // eslint-disable-line

const props = defineProps({
  className: { type: String, default: 'ol-full-screen' },
  label: { type: String, default: '\u2922' },
  labelActive: { type: String, default: '\u00d7' },
  activeClassName: { type: String, default: 'ol-full-screen-true' },
  inactiveClassName: { type: String, default: 'ol-full-screen-false' },
  tipLabel: { type: String, default: 'Toggle full-screen' },
  keys: { type: Boolean, default: false },
  target: { type: Object, default: undefined },
  source: { type: Object, default: undefined }
})

const { control } = useControl(FullScreen, props, { attrs }) // eslint-disable-line
// getCurrentInstance().render = () => control
</script>
