<template lang="">
  <div v-if="false" />
</template>

<script>

import {
  MousePosition
} from 'ol/control'
import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlMousepositionControl',
  props: {
    className: { type: String, default: 'ol-mouse-position' },
    coordinateFormat: { type: [String, Function], default: undefined },
    projection: { type: String, default: undefined },
    render: { type: Function, default: undefined },
    target: { type: HTMLElement, default: undefined },
    undefinedHTML: { type: String, default: '&#160;' }
  },
  setup (props, context) {
    const {
      control
    } = useControl(MousePosition, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
