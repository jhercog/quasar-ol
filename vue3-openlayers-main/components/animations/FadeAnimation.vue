<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Fade from 'ol-ext/featureanimation/Fade'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationFade',
  extends: FeatureAnimation,
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Fade, props)

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
