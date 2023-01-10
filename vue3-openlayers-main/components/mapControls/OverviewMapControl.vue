<template lang="">
  <div>
    <slot />
  </div>
</template>

<script>
import {
  OverviewMap
} from 'ol/control'
import useControl from 'vue3Ol/composables/useControl'
import {
  provide,
  inject,
  onMounted,
  onUnmounted
} from 'vue'
export default {
  name: 'OlOverviewmapControl',
  props: {
    className: { type: String, default: 'ol-overviewmap' },
    collapsed: { type: Boolean, default: true },
    collapseLabel: { type: String, default: '«' },
    collapsible: { type: Boolean, default: true },
    label: { type: String, default: '»' },
    render: { type: Function, default: undefined },
    rotateWithView: { type: Boolean, default: false },
    target: { type: HTMLElement, default: undefined },
    tipLabel: { type: String, default: 'Overview map' }
  },
  setup (props, context) {
    const map = inject('map')

    const {
      control
    } = useControl(OverviewMap, props, context)

    onMounted(() => {
      control.value.setMap(map)
    })

    onUnmounted(() => {
      control.value.setMap(null)
    })

    provide('overviewMap', control)

    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
