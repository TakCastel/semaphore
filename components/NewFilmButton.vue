<template>
  <button
    class="group cursor-pointer flex items-center justify-center xl:justify-start gap-2 w-14 h-14 xl:w-auto xl:h-auto px-0 xl:pl-2 xl:pr-4 xl:py-2 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base disabled:opacity-50"
    :disabled="loading"
    @click="fetchRandomFilm"
  >
    <span
      class="bg-white rounded-full w-7 h-7 flex items-center justify-center shrink-0"
    >
      <Icon name="fluent-emoji:clapper-board" class="w-5 h-5" />
    </span>
    <span
      class="hidden xl:inline-block whitespace-nowrap pl-2 min-w-[7.5rem] text-left"
    >
      {{ loading ? "Chargement..." : "Nouveau film" }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const store = useFilmStore();
const fetchRandomFilm = store.fetchRandomFilm;
const loading = computed(() => store.loading);
</script>
