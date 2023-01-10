<template lang="">
  <div v-if="false" />
</template>

<script>
import VideoRecorder from 'ol-ext/control/VideoRecorder'
import {
  saveAs
} from 'file-saver'
import useControl from 'vue3Ol/composables/useControl'
import { toRefs } from 'vue'
export default {
  name: 'OlControlVideorecorder',
  props: {
    className: { type: String, default: undefined },
    framerate: { type: Number, default: 30 },
    videoBitsPerSecond: { type: Number, default: 5000000 },
    videoTarget: { type: String, default: undefined },
    downloadName: { type: String, default: 'mapVideo.mp4' }
  },
  emits: ['start', 'stop'],
  setup (props, context) {
    const {
      control
    } =
        useControl(VideoRecorder, props, context)

    const { downloadName } = toRefs(props)

    control.value.on('start', (event) => {
      context.emit('start', event)
    })

    control.value.on('stop', (event) => {
      context.emit('stop', event)
      saveAs(event.videoURL, downloadName.value)
    })
    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
