<template>
  <component :is="control" />
</template>

<script>
export default { name: 'OlFullscreenControl' }
</script>

<script setup>
import { useAttrs, computed } from 'vue' // eslint-disable-line
import { FullScreen } from 'ol/control'
import useControl from 'vue3Ol/composables/useControl'

const attrs = useAttrs()

const props = defineProps({
  className: { type: String, default: 'ol-full-screen' },
  label: {
    type: [String, Function, HTMLElement],
    default: () => {
      const label = document.createElement('i').classList.add('mdi', 'mdi-fullscreen')
      return label
    }
  },
  labelActive: {
    type: [String, Function, HTMLElement],
    default: () => {
      const label = document.createElement('i').classList.add('mdi', 'mdi-fullscreen-exit')
      return label
    }
  },
  activeClassName: { type: String, default: 'ol-full-screen-true' },
  inactiveClassName: { type: String, default: 'ol-full-screen-false' },
  tipLabel: { type: String, default: 'Toggle full-screen' },
  keys: { type: Boolean, default: false },
  target: { type: Object, default: undefined },
  source: { type: Object, default: undefined }
})

// const options = computed(() => {
//   const label = document.createElement('i')
//   label.classList.add('mdi', 'mdi-fullscreen')
//   const labelActive = document.createElement('i')
//   labelActive.classList.add('mdi', 'mdi-fullscreen-exit')

//   return {
//     ...props,
//     label,
//     labelActive
//   }
// })

// const label = computed(() => {
//   const label = document.createElement('i')
//   label.classList.add('mdi', 'mdi-fullscreen')
//   return props.label ?? label
// })
// const labelActive = computed(() => {
//   const label = document.createElement('i')
//   label.classList.add('mdi', 'mdi-fullscreen-exit')
//   return props.labelActive ?? label
// })

const { control } = useControl(FullScreen, props, { attrs })

// getCurrentInstance().render = () => control
</script>
