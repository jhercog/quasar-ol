<template lang="">
  <div v-if="false" />
</template>

<script>
import PrintDialog from 'ol-ext/control/PrintDialog'

import useControl from 'vue3Ol/composables/useControl'

import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'

export default {
  name: 'OlControlPrintdialog',
  props: {
    lang: { type: String, default: undefined }
  },
  setup (props, context) {
    const {
      control
    } = useControl(PrintDialog, props, context)

    control.value.on(['print', 'error'], function (e) {
      // Print success
      if (e.image) {
        if (e.pdf) {
          // Export pdf using the print info
          const pdf = new jsPDF({ // eslint-disable-line
            orientation: e.print.orientation,
            unit: e.print.unit,
            format: e.print.size
          })
          pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight)
          pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf')
        } else {
          // Save image as file
          e.canvas.toBlob(function (blob) {
            const name = (e.print.legend ? 'legend.' : 'map.') + e.imageType.replace('image/', '')
            saveAs(blob, name)
          }, e.imageType, e.quality)
        }
      } else {
        console.warn('No canvas to export')
      }
    })

    return {
      control
    }
  }
}
</script>

<style lang="">

</style>
