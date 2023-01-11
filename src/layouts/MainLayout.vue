<template>
  <q-layout view="hHr lpr fFr">
    <Header />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          ref="pageRef"
        />
      </router-view>
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import Header from 'components/layout/Header.vue'
import Footer from 'components/layout/Footer.vue'

const pageRef = ref(null)
</script>
