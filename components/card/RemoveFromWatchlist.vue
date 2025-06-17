<template>
  <button
    class="group cursor-pointer flex flex-col xl:flex-row items-center justify-center gap-0 xl:gap-2 rounded-xl xl:rounded-full w-14 h-14 xl:w-auto xl:h-auto p-3 xl:px-4 xl:py-2 bg-neutral-800 hover:bg-neutral-700 text-red-400 transition font-semibold text-base"
    @click="removeFromWatchlist"
  >
    <Icon name="fluent-emoji-high-contrast:cross-mark" />
    <span class="hidden xl:inline">Retirer</span>
  </button>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const props = defineProps<{
  film: { id: number };
}>();

const store = useFilmStore();

function removeFromWatchlist() {
  store.removeSavedFilm(props.film.id);
}
</script>
