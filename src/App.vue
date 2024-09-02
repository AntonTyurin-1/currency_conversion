<template>
  <v-app>
    <Header />
    <div class="mt-16 w-100 h-100 pa-16">
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>
