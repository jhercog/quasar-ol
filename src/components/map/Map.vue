<template>
  <ol-map
    ref="mapRef"
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    :style="{ height: `calc(100vh - ${headerHeight}px)`}"
  >
    <ol-projection-register
      :projection-name="useAppStore().projection"
      :projection-extent="useAppStore().projectionExtent"
      projection-def="+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
    />
    <View ref="viewRef" />
    <OsmLayer ref="osmLayerRef" />
    <!-- <WmtsLayer ref="wmtsLayerRef" /> -->
    <!-- <JawgLayer ref="jawgLayerRef" /> -->
    <ImageLayer
      ref="imageLayer1Ref"
      :url="layer1Url"
    />
    <ImageLayer
      ref="imageLayer2Ref"
      :url="layer2Url"
    />
    <ControlBarLeft :zone-layer="zoneLayer" />
    <ControlBarBottom />
    <ControlSwipe
      v-if="swipeActive"
      :layer-list="layerGroup"
    />
    <!-- <ol-layerswitcherimage-control :layer-group="layerGroup" /> -->
  </ol-map>
  <div class="absolute-right q-mt-sm q-mr-sm column">
    <q-btn
      class="q-pa-xs q-mb-md"
      color="primary"
      icon="mdi-select-compare"
      size="0.625rem"
      @click="swipeActive = !swipeActive"
    />
    <div
      v-if="swipeActive"
      class="column"
    >
      <q-slider
        v-model="layer1slider"
        :min="0"
        :max="17"
        :step="1"
        vertical
        label
        markers
        switch-label-side
        class="q-mb-md"
        @change="changeLayer1"
      />
      <q-slider
        v-model="layer2slider"
        :min="0"
        :max="17"
        :step="1"
        vertical
        label
        markers
        switch-label-side
        @change="changeLayer2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from 'stores'
import View from 'components/map/View.vue'
import OsmLayer from 'components/layers/OsmLayer.vue'
// import WmtsLayer from 'components/layers/WmtsLayer.vue'
// import JawgLayer from 'components/layers/JawgLayer.vue'
import ImageLayer from 'components/layers/ImageLayer.vue'
import ControlBarLeft from 'components/controls/ControlBarLeft.vue'
import ControlBarBottom from 'components/controls/ControlBarBottom.vue'
import ControlSwipe from 'components/controls/ControlSwipe.vue'

const layerNames = [
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2019.03.21..2019.06.21_usa48_epsg5070_v1.0',
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2019.06.25..2019.09.12_usa48_epsg5070_v1.0',
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2019.09.13..2019.12.01_usa48_epsg5070_v1.0',
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2019.12.02..2020.03.20_usa48_epsg5070_v1.0',
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2020.03.21..2020.06.21_usa48_epsg5070_v1.0',
  'lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2020.06.25..2020.09.12_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2019.03.21..2019.06.21_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2019.06.25..2019.09.12_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2019.09.13..2019.12.01_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2019.12.02..2020.03.20_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2020.03.21..2020.06.21_usa48_epsg5070_v1.0',
  'lcv_nir_landsat.glad.tmwm_p50_30m_0..0cm_2020.06.25..2020.09.12_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2019.03.21..2019.06.21_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2019.06.25..2019.09.12_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2019.09.13..2019.12.01_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2019.12.02..2020.03.20_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2020.03.21..2020.06.21_usa48_epsg5070_v1.0',
  'lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2020.06.25..2020.09.12_usa48_epsg5070_v1.0'
]

const mapRef = ref(null)
const viewRef = ref(null)
const osmLayerRef = ref(null)
// const wmtsLayerRef = ref(null)
// const jawgLayerRef = ref(null)
const imageLayer1Ref = ref(null)
const imageLayer2Ref = ref(null)
const layer1slider = ref(0)
const layer2slider = ref(0)
const swipeActive = ref(false)

const props = defineProps({
  headerHeight: { type: Number, default: 48 }
})
const layer1Url = computed(() => {
  return `https://kepler.multione.hr/scm-api/tiles/${layerNames[layer1slider.value]}/{z}/{x}/{y}/default.png`
})
const layer2Url = computed(() => {
  return `https://kepler.multione.hr/scm-api/tiles/${layerNames[layer2slider.value]}/{z}/{x}/{y}/default.png`
})

// const layer1Url = ref('https://kepler.multione.hr/scm-api/tiles/lcv_red_landsat.glad.tmwm_p50_30m_0..0cm_2019.03.21..2019.06.21_usa48_epsg5070_v1.0/{z}/{x}/{y}/default.png')
// const layer2Url = ref('https://kepler.multione.hr/scm-api/tiles/lcv_swir1_landsat.glad.tmwm_p50_30m_0..0cm_2019.03.21..2019.06.21_usa48_epsg5070_v1.0/{z}/{x}/{y}/default.png')

const zoneLayer = computed(() => useAppStore().zoneLayer)
const layerGroup = ref([])

const changeLayer1 = e => {
  console.log(e)
}
const changeLayer2 = e => {

}

onMounted(() => {
  useAppStore().$patch({ map: mapRef.value.map })
  layerGroup.value.push(imageLayer1Ref.value.imageLayerRef.tileLayer)
  layerGroup.value.push(imageLayer2Ref.value.imageLayerRef.tileLayer)
})

</script>
