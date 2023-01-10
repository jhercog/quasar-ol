<template lang="">
  <div v-if="false" />
</template>

<script>
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlLayerswitcherControl',
  props: {
    selection: { type: Boolean, default: undefined },
    displayInLayerSwitcher: { type: Function, default: undefined },
    show_progress: { type: Boolean, default: false }, // eslint-disable-line
    mouseover: { type: Boolean, default: false },
    reordering: { type: Boolean, default: true },
    trash: { type: Boolean, default: false },
    oninfo: { type: Function, default: undefined },
    extent: { type: Boolean, default: undefined },
    onextent: { type: Function, default: undefined },
    drawDelay: { type: Number, default: undefined },
    collapsed: { type: Boolean, default: true },
    layerGroup: { type: Object, default: undefined },
    noScroll: { type: Boolean, default: false }

  },
  setup (props, context) {
    const {
      control
    } = useControl(LayerSwitcher, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
