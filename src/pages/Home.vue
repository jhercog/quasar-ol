<template>
  <q-page class="fit">
    <ol-map
      ref="mapRef"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      :style="{ height: `calc(100vh - ${headerHeight}px)`}"
    >
      <ol-view
        ref="viewRef"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-swipe-control
        v-if="layerList.length > 0"
        ref="swipeControlRef"
        :layer-list="layerList"
      />

      <ol-layerswitcherimage-control />

      <ol-zone-control
        v-if="jawgRef != null"
        :zones="zones"
        :projection="projection"
        :layer="jawgRef.tileLayer"
      />

      <ol-tile-layer
        ref="osmRef"
        title="OSM"
      >
        <ol-source-osm />
      </ol-tile-layer>

      <ol-tile-layer
        ref="jawgRef"
        title="JAWG"
      >
        <ol-source-xyz
          cross-origin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
        />
      </ol-tile-layer>

      <ol-control-bar>
        <!-- <ol-control-toggle
          html="<i class='mdi-inbox'></i>"
          class-name="edit"
          title="Point"
          :on-toggle="(active)=>changeDrawType(active,'Point')"
        />
        <ol-control-toggle
          html="<i class='fas fa-draw-polygon'></i>"
          class-name="edit"
          title="Polygon"
          :on-toggle="(active)=>changeDrawType(active,'Polygon')"
        />
        <ol-control-toggle
          html="<i class='fas fa-circle'></i>"
          class-name="edit"
          title="Circle"
          :on-toggle="(active)=>changeDrawType(active,'Circle')"
        />
        <ol-control-toggle
          html="<i class='fas fa-grip-lines'></i>"
          class-name="edit"
          title="LineString"
          :on-toggle="(active)=>changeDrawType(active,'LineString')"
        /> -->
        <ol-control-videorecorder @stop="videoStopped" />
        <ol-control-printdialog />
      </ol-control-bar>

      <ol-mouseposition-control />

      <ol-fullscreen-control />

      <ol-overviewmap-control>
        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>
      </ol-overviewmap-control>

      <ol-scaleline-control />

      <!-- <ol-rotate-control /> -->

      <ol-zoom-control />

      <ol-zoomslider-control />

      <!-- <ol-zoomtoextent-control
        :extent="[13.6569755388, 42.47999136, 19.3904757016, 46.5037509222]"
        tip-label="Fit to Croatia"
      /> -->

      <ol-context-menu :items="contextMenuItems" />

      <ol-interaction-clusterselect
        :point-radius="20"
        @select="featureSelected"
      >
        <ol-style>
          <ol-style-stroke
            color="green"
            :width="5"
          />
          <ol-style-fill color="rgba(255,255,255,0.5)" />
          <ol-style-icon
            :src="markerIcon"
            :scale="0.05"
          />
        </ol-style>
      </ol-interaction-clusterselect>

      <ol-interaction-select
        v-if="!drawEnable"
        :condition="selectCondition"
        :filter="selectInteactionFilter"
        @select="featureSelected"
      >
        <ol-style>
          <ol-style-stroke
            color="green"
            :width="10"
          />
          <ol-style-fill color="rgba(255,255,255,0.5)" />
          <ol-style-icon
            :src="markerIcon"
            :scale="0.05"
          />
        </ol-style>
      </ol-interaction-select>
    </ol-map>
  </q-page>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { transform } from 'ol/proj'
import markerIcon from 'assets/marker.png'
import starIcon from 'assets/star.png' // eslint-disable-line

const extent = inject('ol-extent') // eslint-disable-line
const Feature = inject('ol-feature')
const Geom = inject('ol-geom')
const selectConditions = inject('ol-selectconditions')

const props = defineProps({
  headerHeight: { type: Number, default: 0 }
})

const mapRef = ref(null)
const viewRef = ref(null)
// const swipeControlRef = ref(null)
const osmRef = ref(null)
const jawgRef = ref(null)

defineExpose({ mapRef })

const center = ref(transform([15.977259, 45.813190], 'EPSG:4326', 'EPSG:3857'))
const projection = ref('EPSG:3857')
const zoom = ref(6)
const rotation = ref(0)
const layerList = ref([])
const selectedCityName = ref('')
const selectedCityPosition = ref([])
const selectCondition = selectConditions.pointerMove

// 'HR': ('Croatia', (13.6569755388, 42.47999136, 19.3904757016, 46.5037509222)),
const zones = [{
  title: 'Croatia',
  extent: [13.6569755388, 42.47999136, 19.3904757016, 46.5037509222]
},
{
  title: 'Slovenia',
  extent: [13.6981099789, 45.4523163926, 16.5648083839, 46.8523859727]
}, {
  title: 'BiH',
  extent: [15.7500260759, 42.65, 19.59976, 45.2337767604]
}
]
const drawEnable = ref(false)
// const drawType = ref('Point')

// const changeDrawType = (active, draw) => {
//   drawEnable.value = active
//   drawType.value = draw
// }

const videoStopped = (event) => {
  console.log(event)
}

const contextMenuItems = ref([])
const vectorsource = ref(null)

contextMenuItems.value = [{
  text: 'Center map here',
  classname: 'some-style-class', // add some CSS rules
  callback: (val) => {
    viewRef.value.setCenter(val.coordinate)
  } // `center` is your callback function
},
{
  text: 'Add a Marker',
  classname: 'some-style-class', // you can add this icon with a CSS class
  // instead of `icon` property (see next line)
  icon: markerIcon, // this can be relative or absolute
  callback: (val) => {
    console.log(val)
    const feature = new Feature({
      geometry: new Geom.Point(val.coordinate)
    })
    vectorsource.value.source.addFeature(feature)
  }
},
'-' // this is a separator
]

const featureSelected = (event) => {
  if (event.selected.length === 1) {
    selectedCityPosition.value = extent.getCenter(event.selected[0].getGeometry().extent_)
    selectedCityName.value = event.selected[0].values_.name
  } else {
    selectedCityName.value = ''
  }
}

const selectInteactionFilter = (feature) => {
  return feature.values_.name !== undefined
}

onMounted(() => {
  layerList.value.push(osmRef.value.tileLayer)
  layerList.value.push(jawgRef.value.tileLayer)
})

</script>
