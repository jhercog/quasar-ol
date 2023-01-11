<template>
  <div :ref="el => mapRef = el">
    <slot />
  </div>
</template>

<script>
const emits = ['click', 'dblclick', 'singleclick', 'pointerdrag', 'pointermove', 'movestart', 'moveend', 'postrender', 'precompose', 'postcompose']
export default { name: 'OlMap' }
</script>

<script setup>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
import Map from 'ol/Map'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

const emit = defineEmits(emits)
const props = defineProps({
  loadTilesWhileAnimating: { type: Boolean, default: false },
  loadTilesWhileInteracting: { type: Boolean, default: false },
  moveTolerance: { type: Number, default: 1 },
  pixelRatio: { type: Number, default: 1 },
  controls: { type: Array, default: () => ([]) }
})

const { properties } = usePropsAsObjectProperties(props)

const mapRef = ref(null)
// const map = ref(new Map(properties))
let map = new Map(properties)
provide('map', map)

watch(properties, () => {
  map.setProperties(properties)
})

onMounted(() => {
  map.setTarget(mapRef.value)
})

onUnmounted(() => {
  map.setTarget(null)
  map = null
})

const focus = () => map.focus()
const forEachFeatureAtPixel = (pixel, callback, options = {}) => map.forEachFeatureAtPixel(pixel, callback, options)
const forEachLayerAtPixel = (pixel, callback, layerFilter) => map.forEachLayerAtPixel(pixel, callback, layerFilter)
const getCoordinateFromPixel = (pixel) => map.getCoordinateFromPixel(pixel)
const refresh = () => map.refresh()
const render = () => map.render()
const updateSize = () => map.updateSize()

for (const event of emits) {
  map.on(event, e => emit(event, e))
}

// map.on('click', e => emit('click', e))
// map.on('dblclick', e => emit('dblclick', e))
// map.on('singleclick', e => emit('singleclick', e))
// map.on('pointerdrag', e => emit('pointerdrag', e))
// map.on('pointermove', e => emit('pointermove', e))
// map.on('movestart', e => emit('movestart', e))
// map.on('moveend', e => emit('moveend', e))
// map.on('postrender', e => emit('postrender', e))
// map.on('precompose', e => emit('precompose', e))
// map.on('postcompose', e => emit('postcompose', e))

defineExpose({
  map,
  mapRef,
  focus,
  forEachFeatureAtPixel,
  forEachLayerAtPixel,
  getCoordinateFromPixel,
  refresh,
  render,
  updateSize
})

// getCurrentInstance().render = () => slots.default(properties)
</script>
