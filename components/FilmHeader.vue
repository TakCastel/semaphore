<template>
  <div class="relative lg:flex lg:items-start lg:gap-8 lg:p-4">
    <!-- Affiche -->
    <div class="lg:w-1/2 lg:max-w-xs lg:shrink-0">
      <FilmPosterBackdrop :poster-path="film.poster_path" />
    </div>

    <!-- Texte en overlay mobile / à droite desktop -->
    <div
      class="z-20 px-4 flex flex-col space-y-4 pt-[10vh] absolute top-0 left-0 w-full min-h-[90%] lg:min-h-0 lg:relative lg:pt-0 lg:w-auto lg:flex-1"
    >
      <h1 class="text-3xl font-bold tracking-tight">{{ film.title }}</h1>
      <FilmInfos
        class="self-start max-w-fit"
        :release-date="film.release_date"
        :runtime="film.runtime"
        :language="film.original_language"
      />
      <FilmGenres :genres="film.genres" />

      <div class="flex-1 flex flex-col justify-end">
        <FilmOverview :overview="film.overview" />
        <FilmButtons :film="film" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilmPosterBackdrop from "./FilmPosterBackdrop.vue";
import FilmInfos from "./FilmInfos.vue";
import FilmGenres from "./FilmGenres.vue";
import FilmOverview from "./FilmOverview.vue";
import FilmButtons from "./FilmButtons.vue";

defineProps<{
  film: {
    id: number;
    title: string;
    release_date: string;
    runtime: number;
    original_language: string;
    overview?: string;
    poster_path?: string | null;
    genres: { id: number; name: string }[];
  };
}>();
</script>
