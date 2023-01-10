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

import Select from 'ol-ext//interaction/SelectCluster'
import Style from 'ol/style/Style'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlInteractionClusterselect',
  props: {
    multi: { type: Boolean, default: false },
    condition: { type: Function, default: undefined },
    filter: { type: Function, default: undefined },
    pointRadius: { type: Number, default: 7 },
    animate: { type: Boolean, default: true },
    featureStyle: { type: Function, default: undefined },
    style: { type: Function, default: undefined }
  },
  emits: ['select'],
  setup (props, {
    emit
  }) {
    const map = inject('map')

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const select = computed(() => {
      const s = new Select({
        ...properties,
        style: new Style()
      })
      s.on('select', (event) => {
        emit('select', event)
      })

      return s
    })

    watch(select, (newVal, oldVal) => {
      map.removeInteraction(oldVal)
      map.addInteraction(newVal)

      map.changed()
    })

    onMounted(() => {
      map.addInteraction(select.value)
    })

    onUnmounted(() => {
      map.removeInteraction(select.value)
    })

    provide('stylable', select)
  }

}
</script>

<style lang="">

</style>
