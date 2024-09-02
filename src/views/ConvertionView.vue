<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="currency1"
          :items="currencies"
          label="From"
          @change="convertCurrency('from')"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="amount1"
          label="Amount"
          min="0"
          step="0.01"
          :rules="amountRules"
          :error-messages="errorMessages"
          @input="handleInput('from')"
          @blur="validateInput"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="currency2"
          :items="currencies"
          label="To"
          @change="convertCurrency('from')"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="amount2"
          label="Converted"
          min="0"
          step="0.01"
          :rules="amountRules"
          :error-messages="errorMessages"
          @input="handleInput('to')"
          @blur="validateInput"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const currency1 = ref("RUB");
const currency2 = ref("USD");
const amount1 = ref(null);
const amount2 = ref(null);
const errorMessages = ref([]);
const currencies = ["RUB", "USD", "EUR"];
const rates = computed(() => store.getters.rates);

const getRateKey = (fromCurrency, toCurrency) => `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;

const amountRules = [
  value => !isNaN(value) || "Please enter a valid number",
  value => value >= 0 || "Amount must be positive",
];

const handleInput = convert => {
  errorMessages.value = [];
  convertCurrency(convert);
};

const validateInput = () => {
  errorMessages.value = amountRules.map(rule => rule(amount1.value)).filter(message => message !== true);
};

const convertCurrency = direction => {
  const rateKey = getRateKey(currency1.value, currency2.value);
  const rate = rates.value[rateKey];

  if (rate) {
    if (direction === "from") {
      amount2.value = (amount1.value * rate).toFixed(2);
    } else {
      amount1.value = (amount2.value / rate).toFixed(2);
    }
  } else {
    console.error(`Rate not found for ${rateKey}`);
  }
};

watch([currency1, currency2], () => {
  convertCurrency("from");
});

onMounted(() => {
  store.dispatch("fetchRates");
});
</script>
