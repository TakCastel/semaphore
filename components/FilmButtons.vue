<template>
  <div class="flex gap-4 pt-2">
    <button
      v-if="!alreadySaved && !alreadySeen"
      class="bg-gradient-to-b from-green-500 to-green-700 text-white font-semibold px-4 py-2 rounded-full shadow hover:brightness-110 transition cursor-pointer"
      @click="save"
    >
      Ajouter à la watchlist
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";
import { computed } from "vue";

const props = defineProps<{
  film: { id: number };
}>();

const store = useFilmStore();

const save = () => {
  store.saveCurrentFilm();
};

const alreadySaved = computed(() =>
  store.savedFilms.some((f) => f.id === props.film.id)
);

const alreadySeen = computed(() =>
  store.seenFilms.some((f) => f.id === props.film.id)
);
</script>
