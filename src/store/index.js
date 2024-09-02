import { createStore } from "vuex";
import { getCurrency } from "@/api/index";

const filterRates = (rates, currencyPairs) => {
  return Object.fromEntries(
    Object.entries(rates).filter(([key]) => currencyPairs.some(pair => key.toLowerCase() === pair))
  );
};

const currencyPairsToFilter = ["rub-eur", "eur-rub", "usd-rub", "rub-usd", "usd-eur", "eur-usd"];

export default createStore({
  state: {
    baseCurrency: "RUB",
    rates: {},
  },
  getters: {
    baseCurrency: state => state.baseCurrency,
    rates: state => state.rates,
  },
  mutations: {
    SET_BASE_CURRENCY(state, currency) {
      state.baseCurrency = currency;
    },
    SET_RATES(state, rates) {
      state.rates = rates;
    },
  },
  actions: {
    async fetchRates({ commit }) {
      try {
        const response = await getCurrency();
        const filteredRates = filterRates(response.data, currencyPairsToFilter);
        commit("SET_RATES", filteredRates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    },
    updateBaseCurrency({ commit, dispatch }, currency) {
      commit("SET_BASE_CURRENCY", currency);
      dispatch("fetchRates");
    },
  },
  modules: {},
});
