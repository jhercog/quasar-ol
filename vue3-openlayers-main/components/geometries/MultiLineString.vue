<template lang="">
  <div v-if="false" />
</template>

<script>
import MultiLineString from 'ol/geom/MultiLineString'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomMultiLineString',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(MultiLineString, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
