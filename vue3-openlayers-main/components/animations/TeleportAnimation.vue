<template lang="">
  <slot />
</template>

<script>
import FeatureAnimation from './FeatureAnimation.vue'
import Teleport from 'ol-ext/featureanimation/Teleport'
import useAnimation from 'vue3Ol/composables/useAnimation'
export default {
  name: 'OlAnimationTeleport',
  extends: FeatureAnimation,
  props: {},
  setup (props) {
    const {
      map,
      vectorLayer,
      properties
    } = useAnimation(Teleport, props)

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
