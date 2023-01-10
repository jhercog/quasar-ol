<template lang="">
  <slot />
</template>

<script>

import Bar from 'ol-ext/control/Bar'

import useControl from 'vue3Ol/composables/useControl'
import { provide } from 'vue'
export default {
  name: 'OlControlBar',
  props: {
    toggleOne: { type: Boolean, default: true },
    group: { type: Boolean, default: true }

  },
  setup (props, context) {
    const {
      control
    } = useControl(Bar, props, context)

    provide('controlBar', control)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
