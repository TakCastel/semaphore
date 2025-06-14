<template>
  <div
    class="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-black"
  >
    <div class="relative aspect-[2/3] group">
      <NuxtLink
        v-if="film?.id"
        :to="`/film/${film.id}`"
        class="absolute inset-0 z-20"
      />
      <FilmPoster
        :poster="film?.poster"
        :title="film?.title"
        :display-synopsis="displaySynopsis"
      />
    </div>

    <FilmText
      v-if="displaySynopsis"
      :title="film?.title"
      :overview="film?.overview"
      :expanded="expanded"
      :truncate-width="truncateWidth"
      @toggle="toggle"
    />

    <FilmActions
      :film-id="film?.id"
      :loading="loading"
      :show-remove="showRemove"
      :is-saved-page="isSavedPage"
      @save="save"
      @remove="remove"
      @ignore="ignore"
      @seen="markSeen"
    />
  </div>
</template>

<script setup lang="ts">
import { useFilmStore } from "@/stores/useFilms";
import { ref, computed, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    film?: {
      title: string;
      release_date: string;
      overview: string;
      poster?: string | null;
      id: number;
    };
    loading?: boolean;
    showRemove?: boolean;
    isSavedPage?: boolean;
    displaySynopsis?: boolean;
  }>(),
  {
    showRemove: false,
    loading: false,
    isSavedPage: false,
    displaySynopsis: true,
  }
);

function ignore() {
  store.fetchRandomFilm();
}

const store = useFilmStore();
const expanded = ref(false);
const cardWidth = ref(300);
const truncateWidth = computed(() => cardWidth.value * 0.6);

function toggle() {
  expanded.value = !expanded.value;
}

function save() {
  store.saveCurrentFilm();
  store.fetchRandomFilm();
}

function markSeen() {
  if (props.film) store.markAsSeen(props.film);
  store.fetchRandomFilm();
}

function remove() {
  if (props.film?.id) store.removeSavedFilm(props.film.id);
}

onMounted(() => {
  const el = document.querySelector(".card-container");
  if (el instanceof HTMLElement) cardWidth.value = el.offsetWidth;
});

watch(
  () => props.film,
  () => {
    expanded.value = false;
  }
);
</script>
