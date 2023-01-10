<template lang="">
  <slot />
</template>

<script>
import {
  provide,
  inject,
  watch,
  onMounted,
  onUnmounted,
  computed
} from 'vue'

import Transform from 'ol-ext/interaction/Transform'

import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlInteractionTransform',
  props: {
    enableRotatedTransform: { type: Boolean, default: false },
    condition: { type: Function, default: undefined },
    addCondition: { type: Function, default: undefined },
    filter: { type: Function, default: undefined },
    layers: { type: Array, default: undefined },
    hitTolerance: { type: Number, default: 2 },
    translateFeature: { type: Boolean, default: true },
    scale: { type: Boolean, default: true },
    rotate: { type: Boolean, default: true },
    keepAspectRatio: { type: Boolean, default: false },
    translate: { type: Boolean, default: true },
    stretch: { type: Boolean, default: true }
  },
  setup (props) {
    const map = inject('map')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const transform = computed(() => {
      const interaction = new Transform({
        ...properties
      })

      return interaction
    })

    watch(transform, (newVal, oldVal) => {
      map.removeInteraction(oldVal)
      map.addInteraction(newVal)

      map.changed()
    })

    onMounted(() => {
      map.addInteraction(transform.value)
    })

    onUnmounted(() => {
      map.removeInteraction(transform.value)
    })

    provide('stylable', transform)
  }

}
</script>

<style lang="">

</style>
