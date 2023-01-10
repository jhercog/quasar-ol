<template lang="">
  <div />
</template>

<script>

export default {
  props: {
    className: { type: String, default: 'ol-layer' },
    opacity: { type: Number, default: 1 },
    visible: { type: Boolean, default: true },
    extent: { type: Array, default: undefined },
    zIndex: { type: Number, default: undefined },
    minResolution: { type: Number, default: undefined },
    maxResolution: { type: Number, default: undefined },
    minZoom: { type: Number, default: undefined },
    maxZoom: { type: Number, default: undefined },
    title: { type: String, default: undefined },
    name: { type: String, default: undefined },
    preview: { type: String, default: undefined },
    baseLayer: { type: Boolean, default: undefined },
    properties: { type: Object, default: () => { } }
  }
}
</script>

<style lang="">

</style>
