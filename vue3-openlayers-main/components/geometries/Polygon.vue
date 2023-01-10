<template lang="">
  <div v-if="false" />
</template>

<script>
import Polygon from 'ol/geom/Polygon'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomPolygon',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(Polygon, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
