<template>
  <div class="flex gap-4 pt-2">
    <button
      @click="save"
      :disabled="isSaved"
      class="px-6 py-2 bg-orange-600 rounded-full text-white font-semibold hover:brightness-110 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSaved ? "Déjà dans la liste" : "Ajouter à ma liste" }}
    </button>

    <button
      @click="markSeen"
      :disabled="isSeen"
      class="px-6 py-2 bg-neutral-800 rounded-full text-white font-semibold hover:brightness-110 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSeen ? "Déjà vu" : "Marquer comme vu" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const props = defineProps<{
  filmId: number;
}>();

const store = useFilmStore();

const save = () => {
  store.saveCurrentFilm();
};

const markSeen = () => {
  if (store.film) store.markAsSeen(store.film);
};

const isSaved = computed(() => store.isSaved(props.filmId));
const isSeen = computed(() => store.isSeen(props.filmId));
</script>
