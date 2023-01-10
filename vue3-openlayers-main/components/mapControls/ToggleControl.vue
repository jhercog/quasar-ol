<template lang="">
  <div v-if="false" />
</template>

<script>
import Toggle from 'ol-ext/control/Toggle'

import useControl from 'vue3Ol/composables/useControl'
export default {
  name: 'OlControlToggle',
  props: {
    html: { type: String, default: undefined },
    interaction: { type: Object, default: undefined },
    className: { type: String, default: undefined },
    title: { type: String, default: undefined },
    onToggle: { type: Function, default: undefined }
  },
  setup (props, context) {
    const {
      control
    } = useControl(Toggle, props, context)

    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
