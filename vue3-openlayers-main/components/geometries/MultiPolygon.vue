<template lang="">
  <div v-if="false" />
</template>

<script>
import MultiPolygon from 'ol/geom/MultiPolygon'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomMultiPolygon',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(MultiPolygon, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
