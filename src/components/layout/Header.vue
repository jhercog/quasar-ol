<template>
  <q-header elevated>
    <q-toolbar>
      <q-icon
        name="mdi-earth"
        size="1.5rem"
        color="accent"
      />
      <q-toolbar-title class="text-bold text-subtitle1 text-primary-2 q-px-md">
        QuasarLayers <span class="text-primary-6 text-weight-regular"> | demo app</span>
      </q-toolbar-title>

      <Geocoder />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import Geocoder from 'components/controls/Geocoder.vue'

const props = defineProps({
  headerHeight: { type: Number, default: 48 }
})
</script>
