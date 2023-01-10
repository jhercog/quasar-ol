<template lang="">
  <div v-if="false" />
</template>

<script>
import useView from 'vue3Ol/composables/useView'

export default {
  name: 'OlView',
  props: {
    center: { type: Array, default: () => [0, 0] },
    constrainRotation: { type: Boolean, default: true },
    enableRotation: { type: Boolean, default: true },
    extent: { type: Array, default: undefined },
    constrainOnlyCenter: { type: Boolean, default: false },
    smoothExtentConstraint: { type: Boolean, default: true },
    maxResolution: { type: Number, default: undefined },
    minResolution: { type: Number, default: undefined },
    maxZoom: { type: Number, default: 28 },
    minZoom: { type: Number, default: 0 },
    multiWorld: { type: Boolean, default: false },
    constrainResolution: { type: Boolean, default: false },
    smoothResolutionConstraint: { type: Boolean, default: true },
    showFullExtent: { type: Boolean, default: false },
    projection: { type: [String, Object], default: 'EPSG:3857' },
    resolution: { type: Number, default: undefined },
    resolutions: { type: Array, default: undefined },
    rotation: { type: Number, default: undefined },
    zoom: { type: Number, default: 0 },
    zoomFactor: { type: Number, default: 2 },
    padding: { type: Array, default: () => [0, 0, 0, 0] }
  },
  setup (props, {
    emit
  }) {
    const view = useView(props, emit)

    return {
      ...view
    }
  }
}
</script>

<style lang="">

</style>
