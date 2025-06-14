<template>
  <div
    v-if="!loading"
    class="absolute top-4 left-0 right-0 z-30 px-4 flex justify-between items-start"
  >
    <!-- Bouton Déjà vu -->
    <button
      v-if="!isSavedPage"
      class="group cursor-pointer flex flex-col xl:flex-row items-center justify-center gap-0 xl:gap-2 rounded-full w-14 h-14 xl:w-auto xl:h-auto p-3 xl:px-4 xl:py-2 bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
      @click.stop="markSeen"
    >
      <Icon name="solar:archive-minimalistic-bold-duotone" />
      <span class="hidden xl:inline-block whitespace-nowrap text-left">
        Déjà vu
      </span>
    </button>

    <!-- Boutons côté droit -->
    <div class="flex flex-col items-end gap-3">
      <!-- Bouton Ça m'intéresse -->
      <button
        v-if="!isSavedPage"
        class="group cursor-pointer flex flex-col xl:flex-row items-center justify-center gap-0 xl:gap-2 rounded-full w-14 h-14 xl:w-auto xl:h-auto p-3 xl:px-4 xl:py-2 bg-gradient-to-b from-green-400 to-green-600 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
        @click.stop="saveFilm"
      >
        <Icon name="solar:heart-angle-bold" />
        <span class="hidden xl:inline-block whitespace-nowrap text-left">
          Ça m'intéresse
        </span>
      </button>

      <!-- Bouton Retirer -->
      <button
        v-if="showRemove"
        class="group cursor-pointer flex flex-col xl:flex-row items-center justify-center gap-0 xl:gap-2 rounded-full w-14 h-14 xl:w-auto xl:h-auto p-3 xl:px-4 xl:py-2 bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
        @click.stop="emit('remove')"
      >
        <Icon name="fluent-emoji-high-contrast:cross-mark" />
        <span class="hidden xl:inline-block whitespace-nowrap text-left">
          Retirer
        </span>
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
