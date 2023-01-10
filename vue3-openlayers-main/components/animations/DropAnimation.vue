<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Drop from 'ol-ext/featureanimation/Drop'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationDrop',
  extends: FeatureAnimation,
  props: {
    side: { type: Number, default: 0 },
    speed: { type: Number, default: 0 }
  },
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Drop, props)

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
