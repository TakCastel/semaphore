<template>
  <main class="px-4 py-10 max-w-5xl mx-auto text-white space-y-10 text-center">
    <!-- Titre -->
    <header class="space-y-1">
      <h1 class="text-4xl font-logo tracking-widest text-red-600 uppercase">
        Films déjà vus
      </h1>
      <p class="text-sm text-neutral-400">
        Le journal de vos explorations cinématographiques.
      </p>
    </header>

    <!-- Message si aucun film -->
    <div v-if="seenFilms.length === 0" class="text-neutral-500 italic text-sm">
      Aucun film n’a encore été marqué comme vu.<br />
      Parcourez, swipez… et remplissez votre journal.
    </div>

    <!-- Liste des films en grille responsive -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <FilmCard
        v-for="film in seenFilms"
        :key="film.id"
        :film="{
          title: film.title,
          release_date: film.release_date,
          overview: film.overview,
          poster: film.poster
            ? `https://image.tmdb.org/t/p/w500${film.poster}`
            : null,
          id: film.id,
        }"
        :loading="false"
        :show-remove="false"
        :is-saved-page="true"
        :display-synopsis="false"
        @remove="() => removeSeenFilm(film.id)"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFilmStore } from "@/stores/useFilms";

const store = useFilmStore();
const seenFilms = computed(() => store.seenFilms);

function removeSeenFilm(id: number) {
  store.removeSeenFilm(id);
}
</script>
