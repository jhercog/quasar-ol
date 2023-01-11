<template>
  <ol-view
    ref="viewRef"
    :projection="projection"
    :extent="extent"
    :center="center"
    :zoom="zoom"
    :rotation="rotation"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from 'stores'
import { transform } from 'ol/proj'

const projection = computed(() => useAppStore().projection)
const extent = computed(() => useAppStore().projectionExtent)
const center = ref(transform([-98.5795, 39.8283], 'EPSG:4326', projection.value))
const zoom = ref(3)
const rotation = ref(0)

</script>
