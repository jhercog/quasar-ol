<template lang="">
  <div v-if="false" />
</template>

<script>
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage'
import useControl from 'vue3Ol/composables/useControl'
import LayerSwitcherControl from './LayerSwitcherControl.vue'

export default {
  name: 'OlLayerswitcherimageControl',
  extends: LayerSwitcherControl,
  setup (props, context) {
    const { control } = useControl(LayerSwitcherImage, props, context)

    return { control }
  }
}
</script>
