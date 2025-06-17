<template>
  <div
    v-if="!loading"
    class="flex justify-between items-center px-4 py-4 w-full"
  >
    <!-- Bouton Déjà vu -->
    <button
      v-if="!isSavedPage"
      class="group cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-purple-400 hover:text-white transition font-semibold text-base"
      @click.stop="markSeen"
    >
      <Icon name="solar:archive-minimalistic-bold-duotone" />
      <span class="hidden xl:inline-block">Déjà vu</span>
    </button>

    <!-- Boutons côté droit -->
    <div class="flex items-center gap-3">
      <!-- Bouton Ça m'intéresse -->
      <button
        v-if="!isSavedPage"
        class="group cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-green-400 hover:text-white transition font-semibold text-base"
        @click.stop="saveFilm"
      >
        <Icon name="solar:heart-angle-bold" />
        <span class="hidden xl:inline-block">Ça m'intéresse</span>
      </button>

      <!-- Bouton Retirer -->
      <button
        v-if="showRemove"
        class="group cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-red-400 hover:text-white transition font-semibold text-base"
        @click.stop="emit('remove')"
      >
        <Icon name="fluent-emoji-high-contrast:cross-mark" />
        <span class="hidden xl:inline-block">Retirer</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";

const filmStore = useFilmStore();

defineProps<{
  isSavedPage?: boolean;
  showRemove?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "remove"): void;
}>();

function saveFilm() {
  filmStore.saveCurrentFilm();
  filmStore.fetchRandomFilm();
}

function markSeen() {
  if (filmStore.film) {
    filmStore.markAsSeen(filmStore.film);
  }
  filmStore.fetchRandomFilm();
}
</script>
