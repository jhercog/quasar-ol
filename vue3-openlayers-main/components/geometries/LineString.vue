<template lang="">
  <div v-if="false" />
</template>

<script>
import LineString from 'ol/geom/LineString'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomLineString',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(LineString, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
