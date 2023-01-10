<template>
  <!-- <q-btn ref="btnRef">
    rgetrg
  </q-btn> -->
  <component :is="control" />
</template>

<script>
export default { name: 'OlSplitterControl' }
</script>

<script setup>
import { ref, useAttrs, inject, computed } from 'vue' // eslint-disable-line
// import { QBtn } from 'quasar/src/components/btn'
import useControl from 'vue3Ol/composables/useControl'
import Control from 'ol/control/Control'

const attrs = useAttrs()
const map = inject('map')
const props = defineProps({
  className: { type: String, default: 'ol-splitter' }
})
// const btnRef = ref(null)
const options = computed(() => {
  const element = document.createElement('div')
  element.className = 'rotate-north ol-unselectable ol-control'
  const button = document.createElement('button')
  button.innerHTML = 'N'
  button.addEventListener('click', (e) => {
    map.getView().setRotation(0)
  }, false)
  element.appendChild(button)

  return { ...props, element }
})

// const RotateNorthControl = new Control({ element })
// map.addControl(RotateNorthControl)

const { control } = useControl(Control, options, { attrs })
// console.log(QBtn)

</script>
