<template>
  <q-layout view="hHr lpr fFr">
    <q-header elevated>
      <q-toolbar>
        <q-icon
          name="mdi-earth"
          size="1.5rem"
          color="accent"
        />
        <q-toolbar-title class="text-bold text-subtitle1 text-primary-2 q-px-md">
          SoilCarbonMapper <span class="text-primary-6 text-weight-regular"> | demo app</span>
        </q-toolbar-title>

        <Geocoder :map="map" />

        <!-- <q-separator
          vertical
          color="primary-8"
          class="q-mx-md"
        /> -->

        <!-- <q-btn
          flat
          round
          dense
          icon="mdi-menu"
          class="text-primary-2"
          @click="rightDrawer = !rightDrawer"
        /> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawer"
      :width="56"
      overlay
      class="q-left-drawer q-py-md"
    >
      <q-scroll-area class="fit">
        <div class="column">
          <q-btn
            v-for="(tool, i) in leftToolbar"
            :key="i"
            :icon="tool.icon"
            color="primary-2"
            flat
          />
        </div>
      </q-scroll-area>

      <div
        class="absolute"
        :style="{bottom: 0, right: 0, transform: 'translateX(100%)', visibility:'visible'}"
      >
        <q-btn
          dense
          flat
          color="primary-2"
          :icon="leftDrawer ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'"
          @click="leftDrawer = !leftDrawer"
        />
      </div>
    </q-drawer>

    <q-drawer
      v-model="rightDrawer"
      side="right"
      :width="300"
    >
      <q-scroll-area :style="{ paddingTop: `${headerHeight}px` }">
        <q-list class="q-list--drawer">
          <MenuItem
            v-for="(item, i) in menuItems"
            :key="i"
            v-bind="item"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          ref="view"
          :header-height="headerHeight"
        />
      </router-view>
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <div
        class="z-top absolute-bottom-right text-primary-6 q-mx-sm q-my-xs"
        :style="{ fontSize: '0.625rem', lineHeight: '1rem' }"
      >
        <a
          href="https://vuejs.org/"
          target="_blank"
        >Vue</a> · <a
          href="https://quasar.dev/"
          target="_blank"
        >Quasar</a> · <a
          href="https://openlayers.org/"
          target="_blank"
        >OpenLayers</a>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import MenuItem from 'src/components/MenuItem.vue'
import Geocoder from 'components/Geocoder.vue'

// const leftToolbar = [
//   {
//     icon: 'mdi-inbox'
//   },
//   {
//     icon: 'mdi-inbox'
//   },
//   {
//     icon: 'mdi-inbox'
//   }
// ]

// const menuItems = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]
const view = ref(null)
const map = ref(null)
const headerHeight = ref(48)
// const miniState = ref(true)
// const leftDrawer = ref(true)
// const rightDrawer = ref(false)

onMounted(() => {
  map.value = view.value.$refs.mapRef.map
})

</script>
