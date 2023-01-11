<template lang="" />

<script>
import Button from 'ol-ext/control/Button'

import useControl from 'vue3Ol/composables/useControl'
export default {
  name: 'OlControlButton',
  props: {
    html: { type: String, default: undefined },
    name: { type: String, default: undefined },
    className: { type: String, default: undefined },
    title: { type: String, default: undefined },
    handleClick: { type: Function, default: undefined }
  },
  setup (props, context) {
    const { control } = useControl(Button, props, context)

    return { control }
  }
}
</script>
