<template lang="">
  <div v-if="false" />
</template>

<script>
import proj4 from 'proj4'
import {
  register
} from 'ol/proj/proj4'
import {
  toRefs
} from 'vue'
import Projection from 'ol/proj/Projection'

export default {
  name: 'OlProjectionRegister',
  props: {
    projectionName: { type: String, default: undefined },
    projectionDef: { type: String, default: undefined },
    projectionExtent: { type: Array, default: undefined }
  },
  setup (props) {
    const {
      projectionName,
      projectionDef,
      projectionExtent
    } = toRefs(props)

    proj4.defs(projectionName.value, projectionDef.value)
    register(proj4)

    const projection = new Projection({
      code: projectionName.value,
      extent: projectionExtent.value
    })

    return {
      projection
    }
  }
}
</script>

<style lang=""></style>
