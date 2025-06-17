<template>
  <div class="space-y-4">
    <!-- Filtres et tri -->
    <div class="flex flex-wrap gap-4 mb-4">
      <select v-model="sortOption" class="bg-neutral-800 text-white px-3 py-2">
        <option value="date_desc">Du plus récent au plus ancien</option>
        <option value="date_asc">Du plus ancien au plus récent</option>
        <option value="popularity_desc">Du plus connu au moins connu</option>
      </select>

      <select v-model="roleFilter" class="bg-neutral-800 text-white px-3 py-2">
        <option value="all">Tous les rôles</option>
        <option value="main">Rôle principal</option>
        <option value="secondary">Second rôle</option>
        <option value="voice">Voix uniquement</option>
      </select>
    </div>

    <!-- Grid filmographie -->
    <h2 class="text-2xl font-bold">Filmographie</h2>
    <div
      v-if="filteredFilmography.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <NuxtLink
        v-for="film in filteredFilmography"
        :key="film.id"
        :to="`/movie/${film.id}`"
        class="block group"
      >
        <div class="w-full aspect-[2/3] bg-neutral-800 overflow-hidden">
          <img
            v-if="film.poster_path"
            :src="`https://image.tmdb.org/t/p/w300${film.poster_path}`"
            :alt="film.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-neutral-500 text-xs"
          >
            Pas d'image
          </div>
        </div>
        <div class="mt-2 text-sm font-medium line-clamp-2">
          {{ film.title }}
        </div>
      </NuxtLink>
    </div>

    <!-- Fallback si aucun film -->
    <div v-else class="text-neutral-400">Aucun film correspondant.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Props : liste brute
const props = defineProps<{
  rawFilmography: any[];
}>();

// Options de tri et filtre
const sortOption = ref<"date_desc" | "date_asc" | "popularity_desc">(
  "date_desc"
);
const roleFilter = ref<"all" | "main" | "secondary" | "voice">("all");

// Liste filtrée et triée
const filteredFilmography = ref<any[]>([]);

// Appliquer tri/filtre à chaque changement
watch(
  [() => props.rawFilmography, sortOption, roleFilter],
  () => {
    let list = [...props.rawFilmography];

    // Filtre type de rôle
    if (roleFilter.value === "main") {
      list = list.filter((f) => f.order <= 3);
    } else if (roleFilter.value === "secondary") {
      list = list.filter((f) => f.order > 3);
    } else if (roleFilter.value === "voice") {
      list = list.filter(
        (f) =>
          f.character?.toLowerCase().includes("voice") ||
          f.character?.toLowerCase().includes("voix")
      );
    }

    // Tri
    if (sortOption.value === "date_desc") {
      list.sort((a, b) =>
        (b.release_date || "").localeCompare(a.release_date || "")
      );
    } else if (sortOption.value === "date_asc") {
      list.sort((a, b) =>
        (a.release_date || "").localeCompare(b.release_date || "")
      );
    } else if (sortOption.value === "popularity_desc") {
      list.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
    }

    filteredFilmography.value = list;
  },
  { immediate: true }
);
</script>
