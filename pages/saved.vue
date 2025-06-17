<template>
  <main class="px-4 py-10 max-w-5xl mx-auto text-white space-y-10 text-center">
    <!-- Titre -->
    <header class="space-y-1">
      <h1 class="text-4xl font-logo tracking-widest text-red-600 uppercase">
        Votre sélection
      </h1>
      <p class="text-sm text-neutral-400">
        La mémoire de vos envies cinématographiques.
      </p>
    </header>

    <!-- Message si aucun film -->
    <div v-if="savedFilms.length === 0" class="text-neutral-500 italic text-sm">
      Aucun film n’a encore été sauvegardé.<br />
      Explorez, cliquez… et construisez votre propre collection.
    </div>

    <!-- Liste des films en grille responsive -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <CardBase
        v-for="film in savedFilms"
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
        show-add-seen
        show-remove-watchlist
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const store = useFilmStore();
const savedFilms = computed(() => store.savedFilms);
</script>
