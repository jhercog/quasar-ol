<template lang="">
  <div v-if="false" />
</template>

<script>
import Zone from 'ol-ext/control/MapZone'
import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlZoneControl',
  props: {
    className: { type: String, default: undefined },
    zones: { type: Array, default: undefined },
    layer: { type: [Object, Function], default: undefined },
    projection: { type: String, default: 'EPSG:3857' },
    centerOnClick: { type: Boolean, default: true }
  },
  setup (props, context) {
    const {
      control
    } = useControl(Zone, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
