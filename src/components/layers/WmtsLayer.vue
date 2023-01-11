<template>
  <ol-tile-layer
    ref="wmtsLayerRef"
    title="WMTS"
  >
    <ol-source-wmts
      :url="url"
      :format="format"
      :layer="layerName"
      :style="styleName"
      :matrix-set="matrixSet"
    />
  </ol-tile-layer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from 'stores'

const wmtsLayerRef = ref(null)

const url = ref('https://mrdata.usgs.gov/mapcache/wmts/')
const layerName = ref('sgmc2')
const format = ref('image/png')
const styleName = ref('default')
const matrixSet = ref('GoogleMapsCompatible')

onMounted(() => {
  useAppStore().$patch({ wmtsLayer: wmtsLayerRef.value.tileLayer })
})
</script>
