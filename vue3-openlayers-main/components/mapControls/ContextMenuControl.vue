<template lang="">
  <div v-if="false" />
</template>

<script>

import ContextMenu from 'ol-contextmenu'

import useControl from 'vue3Ol/composables/useControl'

export default {
  name: 'OlContextMenu',
  props: {
    eventType: { type: String, default: 'contextmenu' },
    defaultItems: { type: Boolean, default: true },
    width: { type: Number, default: 150 },
    items: { type: Array, default: () => [] }
  },
  setup (props, context) {
    const {
      control
    } = useControl(ContextMenu, props, context)
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
