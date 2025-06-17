<template>
  <button
    v-if="isHome"
    class="inline-flex items-center gap-3 px-4 py-2 backdrop-blur bg-neutral-900/90 text-red-500 font-semibold transition hover:bg-neutral-800 cursor-pointer tab-inverted shadow-lg"
    :disabled="loading"
    @click="fetchRandomFilm"
  >
    <Icon
      name="tabler:arrows-random"
      class="text-xl"
      :class="{ spinner: loading }"
    />
    <span class="hidden sm:inline whitespace-nowrap min-w-[21ch] text-left">
      {{ loading ? "Chargement..." : "Propose moi un nouveau film" }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const filmStore = useFilmStore();

const fetchRandomFilm = filmStore.fetchRandomFilm;
const loading = computed(() => filmStore.loading);

// Afficher uniquement sur la page d'accueil
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<style scoped>
.tab-inverted {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 0;
  position: relative;
}

/* Spinner animation: oscillate speed */
@keyframes spin-cycle {
  0% {
    transform: rotate(0deg);
    animation-timing-function: linear;
  }
  25% {
    transform: rotate(360deg);
    animation-timing-function: ease-out;
  }
  50% {
    transform: rotate(720deg);
    animation-timing-function: linear;
  }
  75% {
    transform: rotate(1080deg);
    animation-timing-function: ease-in;
  }
  100% {
    transform: rotate(1440deg);
  }
}

.spinner {
  animation: spin-cycle 2s infinite;
}
</style>
