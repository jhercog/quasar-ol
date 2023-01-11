<template>
  <ol-tile-layer
    ref="imageLayerRef"
    title="IMAGE"
  >
    <ol-source-image
      :url="url"
      :projection="projection"
      :tile-grid="createXYZ({ extent, minzoom: 4, maxZoom: 18, tileSize: [256, 256] })"
    />
  </ol-tile-layer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from 'stores'
import { createXYZ } from 'ol/tilegrid'

const props = defineProps({
  url: { type: String, default: undefined }
})

const imageLayerRef = ref(null)

const projection = computed(() => useAppStore().projection)
const extent = computed(() => useAppStore().projectionExtent)

defineExpose({ imageLayerRef })
</script>
