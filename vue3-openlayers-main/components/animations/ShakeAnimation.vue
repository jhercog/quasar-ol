<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Shake from 'ol-ext/featureanimation/Shake'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationShake',
  extends: FeatureAnimation,
  props: {
    bounce: { type: Number, default: 6 },
    amplitude: { type: Number, default: 40 },
    horizontal: { type: Boolean, default: false }
  },
  setup (props) {
    const {
      map,
      vectorLayer,
      properties,
      animation
    } = useAnimation(Shake, props)

    return {
      map,
      vectorLayer,
      properties,
      animation
    }
  }
}
</script>

<style lang="">

</style>
