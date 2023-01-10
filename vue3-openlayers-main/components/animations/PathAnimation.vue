<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Path from 'ol-ext/featureanimation/Path'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationPath',
  extends: FeatureAnimation,
  props: {
    rotate: { type: Boolean, default: false },
    speed: { type: Number, default: 0 },
    path: { type: Object, default: undefined }
  },
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Path, props)

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
