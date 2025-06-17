<template>
  <button
    class="group cursor-pointer flex flex-col xl:flex-row items-center justify-center gap-0 xl:gap-2 rounded-xl xl:rounded-full w-14 h-14 xl:w-auto xl:h-auto p-3 xl:px-4 xl:py-2 bg-neutral-800 hover:bg-neutral-700 text-green-400 transition font-semibold text-base"
    @click="addToWatchlist"
  >
    <Icon name="solar:heart-angle-bold" />
    <span class="hidden xl:inline">Ça m'intéresse</span>
  </button>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const store = useFilmStore();

function addToWatchlist() {
  store.saveCurrentFilm();
  store.fetchRandomFilm();
}
</script>
