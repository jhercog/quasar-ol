<template lang="">
  <div v-if="false" />
</template>

<script>
import MultiPoint from 'ol/geom/MultiPoint'
import useGeometry from 'vue3Ol/composables/useGeometry'

export default {
  name: 'OlGeomMultiPoint',
  props: {
    coordinates: { type: Array, default: undefined },
    optLayout: { type: String, default: 'XY' }
  },
  setup (props) {
    const {
      geometry
    } = useGeometry(MultiPoint, props)

    return {
      geometry
    }
  }
}
</script>

<style lang="">

</style>
