<template lang="">
  <slot />
</template>

<script>
import {
  inject
} from 'vue'

import {
  easeOut
} from 'ol/easing'

export default {
  props: {
    duration: { type: Number, default: 1000 },
    revers: { type: Boolean, default: false },
    repeat: { type: Number, default: 0 },
    fade: { type: Function, default: undefined },
    easing: { type: Function, default: easeOut }
  },
  setup () {
    const map = inject('map')
    const vectorLayer = inject('vectorLayer')

    return {
      map,
      vectorLayer
    }
  }
}
</script>

<style lang="">

</style>
