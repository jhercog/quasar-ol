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

import Select from 'ol/interaction/Select'
import Style from 'ol/style/Style'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'
import Collection from 'ol/Collection'
export default {
  name: 'OlInteractionSelect',
  props: {
    multi: { type: Boolean, default: false },
    condition: { type: Function, default: undefined },
    filter: { type: Function, default: undefined },
    features: { type: [Collection, Object], default: undefined },
    hitTolerance: { type: Number, default: 0, validator: value => value >= 0 }
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

    return {
      select
    }
  }

}
</script>

<style lang="">

</style>
