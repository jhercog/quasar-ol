<template>
  <q-page class="fit">
    <ol-map
      ref="mapRef"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      style="height:800px"
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

      <!-- <ol-zone-control
        v-if="jawgLayerRef != null"
        :zones="zones"
        :projection="projection"
        :layer="jawgLayerRef.tileLayer"
      /> -->

      <ol-tile-layer
        ref="osmLayerRef"
        title="OSM"
      >
        <ol-source-osm />
      </ol-tile-layer>

      <ol-tile-layer
        ref="jawgLayerRef"
        title="JAWG"
      >
        <ol-source-xyz
          cross-origin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
        />
      </ol-tile-layer>

      <ol-control-bar>
        <ol-control-toggle
          html="<i class='mdi mdi-map-marker'></i>"
          class-name="edit"
          title="Point"
          :on-toggle="(active)=>changeDrawType(active,'Point')"
        />
        <ol-control-toggle
          html="<i class='mdi mdi-vector-polygon-variant'></i>"
          class-name="edit"
          title="Polygon"
          :on-toggle="(active)=>changeDrawType(active,'Polygon')"
        />
        <ol-control-toggle
          html="<i class='mdi mdi-vector-circle-variant'></i>"
          class-name="edit"
          title="Circle"
          :on-toggle="(active)=>changeDrawType(active,'Circle')"
        />
        <ol-control-toggle
          html="<i class='mdi mdi-vector-polyline'></i>"
          class-name="edit"
          title="LineString"
          :on-toggle="(active)=>changeDrawType(active,'LineString')"
        />
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
      <ol-rotate-control />
      <ol-zoom-control />
      <ol-zoomslider-control />
      <ol-zoomtoextent-control
        :extent="[23.906,42.812,46.934,34.597]"
        tip-label="Fit to Turkey"
      />

      <!-- <ol-context-menu :items="contextMenuItems" /> -->
      <ol-interaction-dragrotatezoom />
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

      <ol-vector-layer
        title="AIRPORTS"
        preview="https://raw.githubusercontent.com/MelihAltintas/vue3-openlayers/main/src/assets/tr.png"
      >
        <ol-source-vector
          ref="citiesRef"
          url="https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities-airports.json"
          :format="geoJson"
          :projection="projection"
        >
          <ol-interaction-modify
            v-if="drawEnable"
            @modifyend="modifyend"
            @modifystart="modifystart"
          />

          <ol-interaction-draw
            v-if="drawEnable"
            :type="drawType"
            @drawend="drawend"
            @drawstart="drawstart"
          />

          <ol-interaction-snap v-if="drawEnable" />
        </ol-source-vector>

        <ol-style>
          <ol-style-stroke
            color="red"
            :width="2"
          />
          <ol-style-fill color="rgba(255,255,255,0.1)" />
          <ol-style-circle :radius="7">
            <ol-style-fill color="blue" />
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>

      <ol-vector-layer
        :update-while-animating="true"
        :update-while-interacting="true"
        title="STAR"
        preview="https://raw.githubusercontent.com/MelihAltintas/vue3-openlayers/main/src/assets/star.png"
      >
        <ol-source-vector ref="vectorsourceRef">
          <ol-animation-shake
            :duration="2000"
            :repeat="5"
          >
            <ol-feature
              v-for="index in 20"
              :key="index"
              :properties="{'id':index}"
            >
              <ol-geom-point :coordinates="[getRandomInRange(24,45,3),getRandomInRange(35,41,3)]" />

              <ol-style>
                <ol-style-icon
                  :src="starIcon"
                  :scale="0.1"
                />
              </ol-style>
            </ol-feature>
          </ol-animation-shake>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-animated-clusterlayer
        :animation-duration="500"
        :distance="40"
        title="CLUSTER"
        preview="https://raw.githubusercontent.com/MelihAltintas/vue3-openlayers/main/src/assets/cluster.png"
      >
        <ol-source-vector ref="vectorsourceRef">
          <ol-feature
            v-for="index in 500"
            :key="index"
          >
            <ol-geom-point :coordinates="[getRandomInRange(24,45,3),getRandomInRange(35,41,3)]" />
          </ol-feature>
        </ol-source-vector>

        <ol-style :override-style-function="overrideStyleFunction">
          <ol-style-stroke
            color="red"
            :width="2"
          />
          <ol-style-fill color="rgba(255,255,255,0.1)" />

          <ol-style-circle :radius="20">
            <ol-style-stroke
              color="black"
              :width="15"
              :line-dash="[]"
              line-cap="butt"
            />
            <ol-style-fill color="black" />
          </ol-style-circle>

          <ol-style-text>
            <ol-style-fill color="white" />
          </ol-style-text>
        </ol-style>
      </ol-animated-clusterlayer>

      <ol-overlay
        v-if="selectedCityName !='' && !drawEnable"
        :position="selectedCityPosition"
      >
        <template #default="slotProps">
          <div class="overlay-content">
            {{ selectedCityName }} {{ slotProps }}
          </div>
        </template>
      </ol-overlay>

      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature ref="animationPathRef">
            <ol-geom-line-string :coordinates="path" />
            <ol-style-flowline
              color="red"
              color2="yellow"
              :width="10"
              :width2="10"
              :arrow="1"
            />
          </ol-feature>
          <ol-animation-path
            v-if="animationPathRef"
            :path="animationPathRef.feature"
            :duration="4000"
            :repeat="10"
          >
            <ol-feature>
              <ol-geom-point :coordinates="path[0]" />
              <ol-style>
                <ol-style-circle :radius="10">
                  <ol-style-fill color="blue" />
                  <ol-style-stroke
                    color="blue"
                    :width="2"
                  />
                </ol-style-circle>
              </ol-style>
            </ol-feature>
          </ol-animation-path>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-webglpoints-layer :style="webglPointsStyle">
        <ol-source-webglpoints
          :format="geoJson"
          url="https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson"
        />
      </ol-webglpoints-layer>
    </ol-map>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'

import markerIcon from 'assets/marker.png'
import starIcon from 'assets/star.png'
export default {
  setup () {
    const format = inject('ol-format')
    const selectConditions = inject('ol-selectconditions')
    const extent = inject('ol-extent')
    const Feature = inject('ol-feature')
    const Geom = inject('ol-geom')

    const mapRef = ref(null)
    const viewRef = ref(null)
    const osmLayerRef = ref(null)
    const jawgLayerRef = ref(null)
    const swipeControlRef = ref(null)
    const citiesRef = ref(null)
    const vectorsourceRef = ref(null)
    const animationPathRef = ref(null)

    const center = ref([15.977259, 45.813190])
    const projection = ref('EPSG:4326')
    const zoom = ref(6)
    const rotation = ref(0)

    const geoJson = new format.GeoJSON()

    const selectCondition = selectConditions.pointerMove

    const selectedCityName = ref('')
    const selectedCityPosition = ref([])

    const contextMenuItems = ref([])

    const drawEnable = ref(false)
    const drawType = ref('Point')

    const changeDrawType = (active, draw) => {
      drawEnable.value = active
      drawType.value = draw
    }

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
        vectorsourceRef.value.source.addFeature(feature)
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

    const overrideStyleFunction = (feature, style) => {
      const clusteredFeatures = feature.get('features')
      const size = clusteredFeatures.length

      const color = size > 20 ? '192,0,0' : size > 8 ? '255,128,0' : '0,128,0'
      const radius = Math.max(8, Math.min(size, 20))
      const dash = 2 * Math.PI * radius / 6
      const calculatedDash = [0, dash, dash, dash, dash, dash, dash]

      style.getImage().getStroke().setLineDash(dash)
      style.getImage().getStroke().setColor('rgba(' + color + ',0.5)')
      style.getImage().getStroke().setLineDash(calculatedDash)
      style.getImage().getFill().setColor('rgba(' + color + ',1)')

      style.getImage().setRadius(radius)

      style.getText().setText(size.toString())
    }

    const selectInteactionFilter = (feature) => {
      return feature.values_.name !== undefined
    }

    const getRandomInRange = (from, to, fixed) => {
      return (Math.random() * (to - from) + from).toFixed(fixed) * 1
    }

    const drawstart = (event) => {
      console.log(event)
    }

    const drawend = (event) => {
      console.log(event)
    }

    const modifystart = (event) => {
      console.log(event)
    }

    const modifyend = (event) => {
      console.log(event)
    }

    const videoStopped = (event) => {
      console.log(event)
    }

    const layerList = ref([])
    const path = ref([
      [
        25.6064453125,
        44.73302734375001
      ],
      [
        27.759765625,
        44.75500000000001
      ],
      [
        28.287109375,
        43.32677734375001
      ],
      [
        30.55029296875,
        46.40294921875001
      ],
      [
        31.69287109375,
        43.04113281250001
      ]

    ])

    onMounted(() => {
      layerList.value.push(jawgLayerRef.value.tileLayer)
      layerList.value.push(osmLayerRef.value.tileLayer)
      console.log(layerList.value)
      console.log(animationPathRef.value)
    })

    const zones = [
      {
        title: 'Croatia',
        extent: [13.6569755388, 42.47999136, 19.3904757016, 46.5037509222]
      },
      {
        title: 'Slovenia',
        extent: [13.6981099789, 45.4523163926, 16.5648083839, 46.8523859727]
      },
      {
        title: 'BiH',
        extent: [15.7500260759, 42.65, 19.59976, 45.2337767604]
      }
    ]

    const webglPointsStyle = {
      symbol: {
        symbolType: 'circle',
        size: [
          'interpolate',
          ['linear'],
          ['get', 'population'],
          40000,
          8,
          2000000,
          28
        ],
        color: '#ffed02',
        rotateWithView: false,
        offset: [0, 0],
        opacity: [
          'interpolate',
          ['linear'],
          ['get', 'population'],
          40000,
          0.6,
          2000000,
          0.92
        ]
      }
    }

    return {
      center,
      projection,
      zoom,
      rotation,

      mapRef,
      viewRef,
      osmLayerRef,
      jawgLayerRef,
      swipeControlRef,
      citiesRef,
      vectorsourceRef,
      animationPathRef,

      geoJson,
      featureSelected,
      selectCondition,
      selectedCityName,
      selectedCityPosition,
      markerIcon,
      overrideStyleFunction,
      getRandomInRange,
      contextMenuItems,

      selectInteactionFilter,
      drawstart,
      drawend,
      modifystart,
      modifyend,
      videoStopped,
      drawEnable,
      drawType,
      layerList,

      starIcon,
      changeDrawType,
      path,

      zones,
      webglPointsStyle
    }
  }
}

</script>
