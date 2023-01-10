<template>
  <div v-if="false" />
</template>

<script>
import WMTSSource from 'ol/source/WMTS'
import TileGridWMTS from 'ol/tilegrid/WMTS'
import { inject, watch, onMounted, onUnmounted, computed } from 'vue'
import usePropsAsObjectProperties from '../../composables/usePropsAsObjectProperties'

export class Tianditu extends WMTSSource {
  constructor (optOptions) {
    Tianditu.layerLabelMap = {
      vec: 'cva',
      ter: 'cta',
      img: 'cia'
    }
    Tianditu.layerZoomMap = {
      vec: 18,
      ter: 14,
      img: 18
    }
    const options = optOptions || {}

    options.layerType = options.layerType || 'vec'
    options.layerType = options.isLabel
      ? Tianditu.layerLabelMap[options.layerType]
      : options.layerType
    options.matrixSet =
      options.projection === 'EPSG:4326' || options.projection === 'EPSG:4490'
        ? 'c'
        : 'w'
    if (!options.url && !options.urls) {
      options.url = 'https://t{0-7}.tianditu.gov.cn/{layer}_{proj}/wmts?'
    }
    if (options.tk) {
      options.url = `${options.url}tk=${options.tk}`
    }
    options.url = options.url
      .replace('{layer}', options.layerType)
      .replace('{proj}', options.matrixSet)
    const tileGrid =
      options.tileGrid ||
      Tianditu.getTileGrid(options.projection || 'EPSG:3857')
    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous'
    const superOptions = {
      version: options.version || '1.0.0',
      format: options.format || 'tiles',
      dimensions: options.dimensions || {},
      layer: options.layerType,
      matrixSet: options.matrixSet,
      tileGrid,
      style: options.style || 'default',
      cacheSize: options.cacheSize,
      crossOrigin,
      opaque: options.opaque === undefined ? true : options.opaque,
      maxZoom: Tianditu.layerZoomMap[options.layerType],
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      url: options.url,
      urls: options.urls,
      projection: options.projection || 'EPSG:3857',
      wrapX: options.wrapX
    }

    if (options.tileProxy) {
      superOptions.tileLoadFunction = tileLoadFunction
    }
    super(superOptions)
    if (options.tileProxy) {
      this.tileProxy = options.tileProxy
    }

    const me = this
    function tileLoadFunction (imageTile, src) {
      imageTile.getImage().src = me.tileProxy + encodeURIComponent(src)
    }
  }

  static getTileGrid (projection) {
    if (projection === 'EPSG:4326' || projection === 'EPSG:4490') {
      return Tianditu.default4326TileGrid()
    }
    return Tianditu.default3857TileGrid()
  }

  static default4326TileGrid () {
    const tdtWGS84Resolutions = []
    const matrixIds = []
    for (let i = 1; i < 19; i++) {
      tdtWGS84Resolutions.push((0.703125 * 2) / Math.pow(2, i))
      matrixIds.push(i)
    }
    const tileGird = new TileGridWMTS({
      extent: [-180, -90, 180, 90],
      resolutions: tdtWGS84Resolutions,
      origin: [-180, 90],
      matrixIds,
      minZoom: 1
    })
    return tileGird
  }

  static default3857TileGrid () {
    const tdtMercatorResolutions = []
    const matrixIds = []
    for (let i = 1; i < 19; i++) {
      tdtMercatorResolutions.push((78271.5169640203125 * 2) / Math.pow(2, i)) // eslint-disable-line
      matrixIds.push(i)
    }
    const tileGird = new TileGridWMTS({
      extent: [
        -20037508.3427892,
        -20037508.3427892,
        20037508.3427892,
        20037508.3427892
      ],
      resolutions: tdtMercatorResolutions,
      matrixIds,
      origin: [-20037508.3427892, 20037508.3427892],
      minZoom: 1
    })
    return tileGird
  }
}
export default {
  name: 'OlSourceTianditu',
  props: {
    layerType: { type: String, default: 'img' },
    tk: { type: String, default: undefined },
    isLabel: { type: Boolean, default: false },
    cacheSize: { type: Number, default: undefined },
    crossOrigin: { type: String, default: undefined },
    projection: { type: String, default: 'EPSG:3857' },
    hidpi: { type: Boolean, default: false },
    requestEncoding: { type: String, default: 'KVP' },
    format: { type: String, default: undefined },
    version: { type: String, default: '1.0.0' },
    culture: { type: String, default: 'en-us' },
    matrixSet: { type: String, default: undefined },
    dimensions: { type: Object, default: () => {} },
    imageSmoothing: { type: Boolean, default: true },
    maxZoom: { type: Number, default: 21 },
    reprojectionErrorThreshold: { type: Number, default: undefined },
    tileLoadFunction: { type: Function, default: (imageTile, src) => (imageTile.getImage().src = src) },
    wrapX: { type: Boolean, default: true },
    transition: { type: Number, default: undefined }
  },
  setup (props) {
    const layer = inject('tileLayer')
    const { properties } = usePropsAsObjectProperties(props)
    const source = computed(() => {
      return new Tianditu(properties)
    })
    watch(source, () => {
      layer.value.setSource(source.value)
    })
    watch(layer, () => {
      layer.value.setSource(source.value)
    })
    onMounted(() => {
      layer.value.setSource(source.value)
    })
    onUnmounted(() => {
      layer.value.setSource(null)
    })
    return {
      layer,
      source
    }
  }
}
</script>

<style lang=""></style>
