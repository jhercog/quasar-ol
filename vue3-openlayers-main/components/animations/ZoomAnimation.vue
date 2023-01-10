<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Zoom from 'ol-ext/featureanimation/Zoom'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationZoom',
  extends: FeatureAnimation,
  props: {
    zoomOut: { type: Boolean, default: false }
  },
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Zoom, props)

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
