<template>
  <q-form>
    <q-select
      ref="select"
      v-model="model"
      class="q-geocoder"
      input-class="q-geocoder__input"
      popup-content-class="q-geocoder__popup"
      input-debounce="300"
      autocomplete="noAutocomplete"
      behavior="menu"
      transition-show="jump-down"
      transition-hide="jump-up"
      use-input
      hide-selected
      hide-bottom-space
      fill-input
      hide-dropdown-icon
      no-error-icon
      menu-shrink

      :style="{ width: '300px' }"
      :popup-content-style="{ width: '300px' }"
      :loading="loading"
      :options="resultsItems"
      :menu-offset="[0 ,9]"

      @filter="search"
      @input-value="setModel"
      @click="search"
      @update:model-value="onSelect"
    >
      <!-- :style="{ wordBreak: 'break-all' }"
      :popup-content-style="{ width: `${popupWidth}px`, wordBreak: 'break-all' }" -->
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <!-- <q-item-section avatar>
            <q-icon name="mdi-map-marker" />
          </q-item-section> -->
          <q-item-section>
            <q-item-label class="text-primary-2 text-weight-bold text-caption">
              {{ scope.opt.label }}
            </q-item-label>
            <q-item-label
              caption
              class="text-primary-4 text-weight-medium"
              :style="{fontSize: '10px'}"
            >
              <!-- {{ scope.opt.coords.lat }}, {{ scope.opt.coords.lon }} -->
              {{ scope.opt.coords }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </template>

      <template #no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>

      <template #append>
        <q-icon
          name="mdi-magnify"
          class="cursor-pointer"
          @click.stop.prevent="model = ''"
        />
      </template>
    </q-select>
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGeocoder, useViewAnimation } from 'composables'
import { toStringHDMS } from 'ol/coordinate'
import { fromLonLat, getTransform } from 'ol/proj'
import { applyTransform } from 'ol/extent'
import { has } from 'lodash'

const props = defineProps({
  map: { type: Object, default: () => ({}) }
})

const { query } = useGeocoder({
  providerName: 'osm',
  options: {
    countrycodes: '',
    lang: 'en-US',
    limit: 6
  }
})

const { to } = useViewAnimation()

const minChars = 3
const select = ref(null)
const model = ref(null)
const loading = ref(false)
const results = ref([])
const lastQueryStr = ref('')
// const popupWidth = ref(0)

const resultsItems = computed(() => {
  const items = []
  if (!results.value) return items

  results.value.forEach(result => {
    items.push({
      label: result.address.name,
      // coords: {
      //   lat: result.lat,
      //   lon: result.lon
      // },
      coords: toStringHDMS([result.lon, result.lat]),
      value: result
    })
  })

  return items
})

const search = (val, update, abort) => {
  loading.value = true
  update(async () => {
    val = val.trim()
    if (val.length >= minChars && val !== lastQueryStr.value) {
      try {
        const res = await query(val)
        if (!res || res.length === 0) return
        results.value = res
      } catch (err) {
        console.error(err)
      }
    }
    loading.value = false

    lastQueryStr.value = val
  })
}

const setModel = (val) => {
  model.value = val
}

const onSelect = item => {
  if (!item || !has(item, 'label') || !has(item, 'value')) return

  // Position Map on result
  const result = item.value
  const mapProjection = props.map.getView().getProjection()
  const coords = fromLonLat([result.lon, result.lat], mapProjection)

  if (has(result, 'boundingbox')) {
    const extent = applyTransform(result.boundingbox, getTransform('EPSG:4326', mapProjection))
    to({
      type: 'fly',
      view: props.map.getView(),
      destination: extent
    })
  } else {
    to({
      type: 'fly',
      view: props.map.getView(),
      destination: coords
    })
  }
}
</script>
