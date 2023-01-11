<template>
  <ol-swipe-control
    v-if="layerList.length > 0"
    ref="swipeControlRef"
    :layer-list="layerList"
    :position="0.5"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  layerList: { type: Array, default: undefined }
})

const swipeControlRef = ref(null)
</script>
