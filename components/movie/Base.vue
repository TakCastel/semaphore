<template>
  <div class="max-w-5xl mx-auto space-y-8 p-4">
    <!-- Bloc principal : affiche + contenu -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Poster -->
      <div class="w-full lg:w-1/2 lg:max-w-xs aspect-[2/3]">
        <MoviePoster :poster-path="posterPath" :title="title" />
      </div>

      <!-- Infos texte + providers + actions -->
      <div class="flex-1 space-y-4">
        <!-- Titre -->
        <h1 class="text-4xl font-bold">{{ title }}</h1>

        <!-- Infos -->
        <MovieInfos
          :release-date="releaseDate"
          :runtime="runtime"
          :language="language"
        />

        <!-- Genres -->
        <MovieGenres :genres="genres" />

        <!-- Synopsis -->
        <p class="text-neutral-300">{{ overview }}</p>

        <!-- Providers -->
        <MovieProviders :providers="providers" />

        <!-- Actions -->
        <MovieActions :film-id="filmId" />
      </div>
    </div>

    <!-- Casting -->
    <MovieCasting :cast="cast" :director="director" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  posterPath: string | null;
  title: string;
  overview: string;
  releaseDate: string;
  runtime: number;
  language: string;
  genres: any[];
  providers: any[];
  cast: any[];
  director: { name: string; profile_path: string | null } | null;
  filmId: number;
}>();
</script>
