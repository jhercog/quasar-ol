<template>
  <ol-tile-layer
    ref="jawgLayerRef"
    title="JAWG"
  >
    <ol-source-xyz
      cross-origin="anonymous"
      url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
    />
  </ol-tile-layer>
</template>

<script setup>
import { ref } from 'vue'

const jawgLayerRef = ref(null)
</script>
