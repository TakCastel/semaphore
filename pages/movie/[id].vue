<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <MovieSkeleton v-if="loading" />

    <MovieBase
      v-else-if="film"
      :poster-path="film.poster_path"
      :title="film.title"
      :overview="film.overview"
      :release-date="film.release_date"
      :runtime="film.runtime"
      :language="film.original_language"
      :genres="film.genres"
      :providers="providers"
      :cast="cast"
      :director="director"
      :film-id="film.id"
    />

    <div v-else class="text-center text-red-500">Film introuvable.</div>
  </div>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const route = useRoute();
const store = useFilmStore();

const film = ref<any>(null);
const loading = ref(true);
const cast = ref<any[]>([]);
const director = ref<{ name: string; profile_path: string | null } | null>(
  null
);
const providers = ref<any[]>([]);

onMounted(async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) return;

  loading.value = true;

  try {
    const config = useRuntimeConfig();

    film.value = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: config.public.tmdbApiKey,
        language: "fr-FR",
      },
    });

    store.film = film.value;

    const credits = await $fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        params: {
          api_key: config.public.tmdbApiKey,
          language: "fr-FR",
        },
      }
    );

    cast.value = credits.cast || [];

    const directorData = credits.crew.find(
      (p) => p.job === "Director" || p.job === "Réalisateur"
    );
    if (directorData) {
      director.value = {
        name: directorData.name,
        profile_path: directorData.profile_path,
      };
    }

    const watch = await $fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      {
        params: {
          api_key: config.public.tmdbApiKey,
        },
      }
    );

    if (watch?.results?.FR?.flatrate) {
      providers.value = watch.results.FR.flatrate;
    }
  } catch (err) {
    console.error("Erreur lors du chargement du film :", err);
  } finally {
    loading.value = false;
  }
});
</script>
