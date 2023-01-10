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
  toRefs
  // computed
} from 'vue'

import Collection from 'ol/Collection'
import Modify from 'ol/interaction/Modify'
// import Style from 'ol/style/Style';
// import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlInteractionModify',
  props: {
    condition: { type: Function, default: undefined },
    deleteCondition: { type: Function, default: undefined },
    insertVertexCondition: { type: Function, default: undefined },
    pixelTolerance: { type: Number, default: 10 },
    wrapX: { type: Boolean, default: false },
    hitDetection: { type: Boolean, default: undefined },
    features: { type: [Collection, Object], default: undefined }
  },
  emits: ['modifystart', 'modifyend'],
  setup (props, {
    emit
  }) {
    const map = inject('map')
    const source = inject('vectorSource')

    const {
      features,
      condition,
      deleteCondition,
      insertVertexCondition,
      pixelTolerance,
      wrapX,
      hitDetection
    } = toRefs(props)

    const createModify = () => {
      const modify = new Modify({
        source: source.value,
        features: features.value,
        condition: condition.value,
        deleteCondition: deleteCondition.value,
        insertVertexCondition: insertVertexCondition.value,
        pixelTolerance: pixelTolerance.value,
        wrapX: wrapX.value,
        hitDetection: hitDetection.value
      })

      modify.on('modifystart', (event) => {
        emit('modifystart', event)
      })

      modify.on('modifyend', (event) => {
        emit('modifyend', event)
      })

      return modify
    }

    let modify = createModify()

    watch([condition,
      deleteCondition,
      insertVertexCondition,
      pixelTolerance,
      wrapX,
      hitDetection
    ], () => {
      map.removeInteraction(modify)
      modify = createModify()
      map.addInteraction(modify)
      modify.changed()

      map.changed()
    })

    onMounted(() => {
      map.addInteraction(modify)
    })

    onUnmounted(() => {
      map.removeInteraction(modify)
    })

    provide('stylable', modify)
  }

}
</script>

<style lang="">

</style>
