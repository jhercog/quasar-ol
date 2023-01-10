<template>
  <div>
    <slot />
  </div>
</template>

<script>
import {
  inject,
  watch,
  onUnmounted,
  onMounted,
  computed

} from 'vue'

import FlowLine from 'ol-ext/style/FlowLine'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import usePropsAsObjectProperties from 'vue3Ol/composables/usePropsAsObjectProperties'

export default {
  name: 'OlStyleFlowline',
  props: {
    color: { type: [String, Function], default: undefined },
    color2: { type: String, default: undefined },
    width: { type: [Number, Function], default: undefined },
    width2: { type: Number, default: undefined },
    arrow: { type: Number, default: undefined },
    arrowColor: { type: String, default: undefined }

  },
  setup (props) {
    const styledObj = inject('stylable', null)

    const {
      properties
    } = usePropsAsObjectProperties(props)

    const style = computed(() => new FlowLine(properties))

    const setStyle = (val) => {
      if (styledObj instanceof Draw || styledObj instanceof Modify) {
        styledObj.getOverlay().setStyle(val)
        styledObj.value.dispatchEvent('styleChanged')
        return
      }
      try {
        styledObj.value.setStyle(val)
        styledObj.value.changed()
        styledObj.value.dispatchEvent('styleChanged')
      } catch (error) {
        styledObj.value.style_ = val
        styledObj.value.values_.style = val

        styledObj.value.changed()
        styledObj.value.dispatchEvent('styleChanged')
      }
    }

    const styleFunc = computed(() => {
      return (feature) => {
        if (properties.overrideStyleFunction != null) {
          properties.overrideStyleFunction(feature, style.value)
        }
        return style.value
      }
    })

    watch(properties, () => {
      if (properties.overrideStyleFunction == null) {
        setStyle(style.value)
      } else {
        setStyle(styleFunc.value)
      }
    })

    onMounted(() => {
      if (properties.overrideStyleFunction == null) {
        setStyle(style.value)
      } else {
        setStyle(styleFunc.value)
      }
    })

    onUnmounted(() => {
      setStyle(null)
    })

    return {
      style
    }
  }

}
</script>

<style lang="">

</style>
