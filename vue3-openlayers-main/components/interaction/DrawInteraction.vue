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

import Draw from 'ol/interaction/Draw'
// import Style from 'ol/style/Style';

export default {
  name: 'OlInteractionDraw',
  props: {
    type: { type: String, required: true },
    clickTolerance: { type: Number, default: 6 },
    dragVertexDelay: { type: Number, default: 500 },
    snapTolerance: { type: Number, default: 12 },
    stopClick: { type: Boolean, default: false },
    maxPoints: { type: Number, default: undefined },
    minPoints: { type: Number, default: undefined },
    finishCondition: { type: Function, default: undefined },
    geometryFunction: { type: Function, default: undefined },
    geometryName: { type: String, default: undefined },
    condition: { type: Function, default: undefined },
    freehand: { type: Boolean, default: false },
    freehandCondition: { type: Function, default: undefined },
    wrapX: { type: Boolean, default: false }
  },
  emits: ['drawstart', 'drawend'],
  setup (props, {
    emit
  }) {
    const map = inject('map')
    const source = inject('vectorSource')

    const {
      type,
      clickTolerance,
      dragVertexDelay,
      snapTolerance,
      stopClick,
      maxPoints,
      minPoints,
      finishCondition,
      geometryFunction,
      geometryName,
      condition,
      freehand,
      freehandCondition,
      wrapX
    } = toRefs(props)

    const createDraw = () => {
      const draw = new Draw({
        source: source.value,
        type: type.value,
        clickTolerance: clickTolerance.value,
        dragVertexDelay: dragVertexDelay.value,
        snapTolerance: snapTolerance.value,
        stopClick: stopClick.value,
        maxPoints: maxPoints.value,
        minPoints: minPoints.value,
        finishCondition: finishCondition.value,
        geometryFunction: geometryFunction.value,
        geometryName: geometryName.value,
        condition: condition.value,
        freehand: freehand.value,
        freehandCondition: freehandCondition.value,
        wrapX: wrapX.value

      })

      draw.on('drawstart', (event) => {
        emit('drawstart', event)
      })

      draw.on('drawend', (event) => {
        emit('drawend', event)
      })

      return draw
    }

    let draw = createDraw()

    watch([type,
      clickTolerance,
      dragVertexDelay,
      snapTolerance,
      stopClick,
      maxPoints,
      minPoints,
      finishCondition,
      geometryFunction,
      geometryName,
      condition,
      freehand,
      freehandCondition,
      wrapX
    ], () => {
      map.removeInteraction(draw)
      draw = createDraw()
      map.addInteraction(draw)
      draw.changed()

      map.changed()
    })

    onMounted(() => {
      map.addInteraction(draw)
    })

    onUnmounted(() => {
      map.removeInteraction(draw)
    })

    provide('stylable', draw)
  }

}
</script>

<style lang="">

</style>
