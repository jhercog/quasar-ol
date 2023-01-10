<template>
  <div class="overflow-hidden absolute-full">
    <q-splitter
      id="photos"
      v-model="splitterModel"
      :limits="[0, 100]"
      :style="splitterStyle"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
    >
      <template #before>
        <img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :width="width"
          class="absolute-top-left"
        >
      </template>

      <template #after>
        <img
          src="https://cdn.quasar.dev/img/parallax1-bw.jpg"
          :width="width"
          class="absolute-top-right"
        >
      </template>
    </q-splitter>

    <q-resize-observer
      :debounce="0"
      @resize="onResize"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const width = ref(400)
const splitterModel = ref(50)
const splitterStyle = computed(() => ({
  height: Math.min(600, 0.66 * width.value) + 'px',
  width: width.value + 'px'
}))
const onResize = (info) => {
  width.value = info.width
}
</script>
