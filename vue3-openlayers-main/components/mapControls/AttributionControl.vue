<template lang="">
  <div v-if="false" />
</template>

<script>
import {
  Attribution
} from 'ol/control'
import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlAttributionControl',
  props: {
    className: { type: String, default: 'ol-attribution' },
    target: { type: HTMLElement, default: undefined },
    collapsible: { type: Boolean, default: undefined },
    collapsed: { type: Boolean, default: true },
    tipLabel: { type: String, default: 'Attributions' },
    label: { type: String, default: 'i' },
    expandClassName: { type: String, default: 'ol-attribution-expand' },
    collapseLabel: { type: String, default: '»' },
    collapseClassName: { type: String, default: 'ol-attribution-collapse' },
    render: { type: Function, default: undefined }
  },
  setup (props, context) {
    const {
      control
    } = useControl(Attribution, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
