<template lang="">
  <div v-if="false" />
</template>

<script>
import Point from 'ol/geom/Point'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomPoint',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(Point, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
