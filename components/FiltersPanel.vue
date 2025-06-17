<template>
  <div v-show="open" class="fixed inset-0 z-50 pointer-events-none">
    <transition name="slide-down" mode="out-in">
      <aside
        v-show="open"
        class="absolute top-0 left-0 right-0 h-screen bg-neutral-950 text-white shadow-2xl border-t border-white/10 flex flex-col justify-between pointer-events-auto"
        tabindex="0"
        @keyup.esc="emitClose"
      >
        <!-- Header -->
        <div class="relative px-6 pt-6 pb-4 border-b border-white/10">
          <h2 class="text-lg font-semibold">Filtres</h2>
          <button
            class="absolute top-6 right-6 text-neutral-400 hover:text-white text-xl"
            aria-label="Fermer les filtres"
            @click="emitClose"
          >
            ✕
          </button>
        </div>

        <!-- Formulaire -->
        <div class="flex-1 p-4 overflow-y-auto">
          <FormKit type="form" :actions="false" @submit="apply">
            <FormKit
              v-model="filters.genre"
              type="select"
              name="genre"
              label="Genre"
              :options="[
                { label: 'Tous genres', value: '' },
                ...genres.map((g) => ({ label: g.name, value: g.id })),
              ]"
            />

            <FormKit
              v-model="filters.language"
              type="select"
              name="language"
              label="Langue"
              :options="[
                { label: 'Toutes langues', value: '' },
                ...languages.map((l) => ({
                  label: l.english_name,
                  value: l.iso_639_1,
                })),
              ]"
            />

            <div class="flex gap-3">
              <FormKit
                v-model="filters.yearMin"
                type="number"
                name="yearMin"
                placeholder="Depuis..."
              />
              <FormKit
                v-model="filters.yearMax"
                type="number"
                name="yearMax"
                placeholder="Jusqu’à..."
              />
            </div>

            <FormKit
              v-model="filters.includeAdult"
              type="checkbox"
              name="includeAdult"
              label="Inclure les films classés “adultes”"
            />
          </FormKit>
        </div>

        <!-- Footer -->
        <div class="px-6 py-5 border-t border-white/10 space-y-3">
          <FormKit type="submit" label="Appliquer les filtres" />
          <button
            type="button"
            class="text-neutral-400 hover:text-white text-sm underline cursor-pointer"
            @click="reset"
          >
            Réinitialiser
          </button>
        </div>
      </aside>
    </transition>
  </div>
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
  films.fetchRandomFilm();
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
