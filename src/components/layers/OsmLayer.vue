<template>
  <ol-tile-layer
    ref="osmLayerRef"
    title="OSM"
  >
    <ol-source-osm />
  </ol-tile-layer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from 'stores'

const osmLayerRef = ref(null)

onMounted(() => {
  useAppStore().$patch({ zoneLayer: osmLayerRef.value.tileLayer })
})
</script>
