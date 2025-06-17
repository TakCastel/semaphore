<template>
  <transition name="slide-down" mode="out-in">
    <div v-show="open" class="fixed inset-0 z-50">
      <aside
        class="absolute top-0 left-0 right-0 bg-neutral-950 text-white pointer-events-auto"
        tabindex="0"
        @keyup.esc="emitClose"
      >
        <!-- Header -->
        <div
          class="flex justify-between items-center px-6 py-4 border-b border-white/10"
        >
          <h2 class="text-lg font-semibold">Filtres</h2>
          <button
            class="text-2xl text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Fermer les filtres"
            @click="emitClose"
          >
            ✕
          </button>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="apply"
          class="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] w-full md:max-w-md mx-auto"
        >
          <div class="flex flex-col space-y-1">
            <label class="text-sm">Genre</label>
            <select
              v-model="filters.genre"
              class="w-full px-3 py-2 bg-neutral-800 text-white"
            >
              <option value="">Tous genres</option>
              <option v-for="g in genres" :key="g.id" :value="g.id">
                {{ g.name }}
              </option>
            </select>
          </div>

          <div class="flex flex-col space-y-1">
            <label class="text-sm">Langue</label>
            <select
              v-model="filters.language"
              class="w-full px-3 py-2 bg-neutral-800 text-white"
            >
              <option value="">Toutes langues</option>
              <option
                v-for="l in languages"
                :key="l.iso_639_1"
                :value="l.iso_639_1"
              >
                {{ l.english_name }}
              </option>
            </select>
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col flex-1 space-y-1">
              <label class="text-sm">Depuis</label>
              <input
                v-model.number="filters.yearMin"
                type="number"
                placeholder="Depuis..."
                class="w-full px-3 py-2 bg-neutral-800 text-white"
              />
            </div>
            <div class="flex flex-col flex-1 space-y-1">
              <label class="text-sm">Jusqu’à</label>
              <input
                v-model.number="filters.yearMax"
                type="number"
                placeholder="Jusqu’à..."
                class="w-full px-3 py-2 bg-neutral-800 text-white"
              />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <input
              id="includeAdult"
              type="checkbox"
              v-model="filters.includeAdult"
              class="accent-red-600 w-5 h-5"
            />
            <label for="includeAdult" class="text-sm"
              >Inclure les films “adultes”</label
            >
          </div>

          <button
            type="submit"
            class="w-full bg-red-700 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 cursor-pointer"
          >
            Appliquer les filtres
          </button>

          <button
            type="button"
            @click="reset"
            class="text-sm text-neutral-400 hover:text-white underline mt-2 cursor-pointer"
          >
            Réinitialiser
          </button>
        </form>
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useFiltersStore } from "@/stores/useFilters";
import { useFilmStore } from "@/stores/useFilms";
import { useFiltersOptions } from "@/composables/useFiltersOptions";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["close"]);

const filters = useFiltersStore();
const films = useFilmStore();
const { genres, languages } = await useFiltersOptions();

function apply() {
  films.fetchRandomFilm(); // déclenche la recherche avec les filtres choisis
  emit("close");
}

function reset() {
  filters.resetFilters();
  films.fetchRandomFilm();
  emit("close");
}

function emitClose() {
  emit("close");
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
