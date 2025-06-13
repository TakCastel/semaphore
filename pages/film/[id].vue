<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <FilmSkeleton v-if="loading" />

    <div v-else-if="film" class="max-w-5xl mx-auto space-y-8">
      <FilmHeader :film="film" />
      <FilmCast :cast="cast" />
      <FilmDirector :director="director" />
    </div>

    <div v-else class="text-center text-red-500">Film introuvable.</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useFilmStore } from "@/stores/useFilms";

const route = useRoute();
const store = useFilmStore();

const film = ref<any>(null); // local au lieu de store
const loading = ref(true);
const cast = ref<any[]>([]);
const director = ref<{ name: string; profile_path: string | null } | null>(
  null
);

onMounted(async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) return;

  loading.value = true;

  try {
    const config = useRuntimeConfig();

    // Fetch film directement (ne touche pas store.film)
    film.value = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: config.public.tmdbApiKey,
        language: "fr-FR",
      },
    });

    // Tu peux en parallèle stocker dans le store si utile :
    store.film = film.value;

    // Fetch credits
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
  } catch (err) {
    console.error("Erreur lors du chargement du film :", err);
  } finally {
    loading.value = false;
  }
});
</script>
