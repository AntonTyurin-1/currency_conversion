<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(rate, currency) in rates"
        :key="currency"
      >
        <v-card>
          <v-card-title>
            1 {{ sliceCurrencyTitle(currency) }} = {{ rate.toFixed(2) }} {{ baseCurrency }}</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { watch, onMounted, computed } from "vue";

import { useStore } from "vuex";

const store = useStore();

const baseCurrency = computed(() => store.getters.baseCurrency);

const rates = computed(() => {
  return filterRates(store.getters.rates, baseCurrency.value);
});

const filterRates = (rates, baseCurrency) => {
  return Object.fromEntries(
    Object.entries(rates).filter(([key]) => key.endsWith(baseCurrency.toLowerCase()))
  );
};

const sliceCurrencyTitle = currency => {
  return currency.slice(0, 3).toUpperCase();
};

watch(
  () => baseCurrency.value,
  () => {
    store.dispatch("fetchRates");
  }
);

onMounted(async () => {
  await store.dispatch("fetchRates");
});
</script>
