import {

  provide,
  computed

} from 'vue'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'
import Animation from 'vue3Ol/components/animations/FeatureAnimation.vue'

export default function useAnimation (AnimationType, props) {
  const {

    map,
    vectorLayer

  } = Animation.setup()

  const {
    properties
  } = usePropsAsObjectProperties(props)

  const animation = computed(() => {
    const anim = new AnimationType({
      ...properties

    })

    return anim
  })

  provide('animation', animation)

  return {

    map,
    vectorLayer,
    animation,
    properties
  }
}
