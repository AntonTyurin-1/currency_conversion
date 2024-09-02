<template>
  <v-app-bar
    app
    class="pr-16 pl-16 pt-4"
  >
    <div class="d-flex aligh-center ga-6">
      <router-link to="/">Главная</router-link> <router-link to="/convert">Конвертация</router-link>
    </div>

    <v-spacer />

    <div style="width: 100px">
      <v-select
        v-model="baseCurrency"
        :items="currencies"
        @update:model-value="updateCurrency"
      />
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const updateCurrency = value => {

  store.dispatch("updateBaseCurrency", value);
};

const baseCurrency = computed(() => store.getters.baseCurrency);

const currencies = ["RUB", "USD", "EUR"];
</script>
