// ✅ Store corrigé : useFiltersStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";

export const useFiltersStore = defineStore("filters", () => {
  const genre = ref<string>(""); // <- pas null
  const language = ref<string>(""); // <- pas null
  const yearMin = ref<number | null>(null);
  const yearMax = ref<number | null>(null);
  const includeAdult = ref(false);

  function resetFilters() {
    genre.value = "";
    language.value = "";
    yearMin.value = null;
    yearMax.value = null;
    includeAdult.value = false;
  }

  return {
    genre,
    language,
    yearMin,
    yearMax,
    includeAdult,
    resetFilters,
  };
});
