<template>
  <ol-control-bar class-name="jh-control-bar left">
    <ol-fullscreen-control />
    <ol-rotate-control />
    <ol-zoom-control />
    <ol-zoomslider-control />
    <ol-zone-control
      v-if="zoneLayer"
      :zones="zones"
      :layer="zoneLayer"
      :projection="projection"
    />
  </ol-control-bar>
</template>

<script setup>
import { computed } from 'vue'
import { transform, transformExtent, fromLonLat } from 'ol/proj' // eslint-disable-line
import { useAppStore } from 'stores'

const projection = computed(() => useAppStore().projection)

// const t = ext => transformExtent(ext, 'EPSG:4326', projection.value)

const zones = [
  {
    title: 'Washington',
    // extent: [-2212457.754995629, 2843560.4169876953, -1537060.5122663067, 3058329.224589595]
    extent: [-124.763068, 45.543541, -116.915989, 49.002494]
    // extent: t([-124.763068, 45.543541, -116.915989, 49.002494])
  },
  {
    title: 'California',
    // extent: [-2614555.341500591, 1445063.049452257, -1482352.2268582261, 2253815.223023828]
    extent: [-124.409591, 32.534156, -114.131211, 42.009518]
    // extent: t([-124.409591, 32.534156, -114.131211, 42.009518])
  },
  {
    title: 'Kentucky',
    // extent: [570115.4492620431, 1513707.3408323466, 1197427.0892840147, 1880019.631993532]
    extent: [-89.571509, 36.497129, -81.964971, 39.147458]
    // extent: t([-89.571509, 36.497129, -81.964971, 39.147458])
  }
]
// console.log(zones, useAppStore().projectionExtent)
console.log(transformExtent([-124.763068, 45.543541, -116.915989, 49.002494], 'EPSG:4326', projection.value), [...fromLonLat([-124.763068, 45.543541]), ...fromLonLat([-116.915989, 49.002494])], useAppStore().projectionExtent)

const props = defineProps({
  zoneLayer: { type: Object, default: null }
})

// const extent = ref([-171.791110603, 18.91619, -66.96466, 71.3577635769])
// const extent = ref(transformExtent([-171.791110603, 18.91619, -66.96466, 71.3577635769], 'EPSG:4326', 'EPSG:3857'))
// const center = ref(transform([-98.5795, 39.8283], 'EPSG:4326', 'EPSG:3857'))

</script>
