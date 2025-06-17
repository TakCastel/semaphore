<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <ActorSkeleton v-if="loading" />

    <div v-else-if="actor" class="max-w-5xl mx-auto space-y-8 p-4">
      <ActorHeader :actor="actor" />
      <ActorFilmography :rawFilmography="filmography" />
    </div>

    <div v-else class="text-center text-red-500">Acteur introuvable.</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const actor = ref<any>(null);
const filmography = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) return;

  loading.value = true;

  try {
    const config = useRuntimeConfig();

    actor.value = await $fetch(`https://api.themoviedb.org/3/person/${id}`, {
      params: {
        api_key: config.public.tmdbApiKey,
        language: "fr-FR",
      },
    });

    const credits = await $fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      {
        params: {
          api_key: config.public.tmdbApiKey,
          language: "fr-FR",
        },
      }
    );

    filmography.value = credits.cast || [];
  } catch (err) {
    console.error("Erreur lors du chargement de l'acteur :", err);
  } finally {
    loading.value = false;
  }
});
</script>
