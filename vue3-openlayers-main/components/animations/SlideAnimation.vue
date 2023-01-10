<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Slide from 'ol-ext/featureanimation/Slide'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationSlide',
  extends: FeatureAnimation,
  props: {
    speed: { type: Number, default: 0 }
  },
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Slide, props)

    return {
      map,
      vectorLayer,
      properties
    }
  }
}
</script>

<style lang="">

</style>
