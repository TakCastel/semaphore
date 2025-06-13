import { defineStore } from "pinia";

export const useFiltersStore = defineStore(
  "filters",
  () => {
    const genre = ref<string | null>(null);
    const language = ref<string | null>(null);
    const yearMin = ref<number | null>(null);
    const yearMax = ref<number | null>(null);
    const includeAdult = ref(false);

    function resetFilters() {
      genre.value = null;
      language.value = null;
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
  },
  {
    persist: true,
  }
);
