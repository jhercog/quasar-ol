<template>
  <q-page class="fit">
    <Map
      ref="mapRef"
      :header-height="headerHeight"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Map from 'components/map/Map.vue'

const props = defineProps({
  headerHeight: { type: Number, default: 48 }
})

const mapRef = ref(null)

defineExpose({ mapRef })

onMounted(() => {
  // console.log(mapRef.value.mapRef.map)
})
</script>
