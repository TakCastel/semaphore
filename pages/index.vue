<template>
  <main class="p-4 mx-auto text-white space-y-4 text-center max-w-6xl">
    <!-- Message de fallback -->
    <!-- <p
      v-if="filmStore.fallbackTriggered"
      class="text-sm text-amber-400 bg-amber-500/10 px-4 py-2 rounded-full max-w-md mx-auto"
    >
      Aucun film ne correspond à vos critères… mais celui-ci pourrait vous
      plaire.
    </p> -->

    <!-- Affichage du film -->
    <div class="relative flex justify-center">
      <CardBase
        :loading="filmStore.loading"
        :film="
          filmStore.film && {
            title: filmStore.film.title,
            release_date: filmStore.film.release_date,
            overview: filmStore.film.overview,
            poster: filmStore.poster,
            id: filmStore.film.id,
          }
        "
        show-add-seen
        show-add-watchlist
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFilmStore } from "@/stores/useFilms";

const filmStore = useFilmStore();

onMounted(() => {
  filmStore.fetchRandomFilm();
});
</script>
