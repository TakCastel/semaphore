<template>
  <div
    class="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-black flex flex-col"
  >
    <!-- Bloc Poster + Texte par-dessus -->
    <div class="relative aspect-[2/3]">
      <CardMoviePoster
        :poster="film?.poster"
        :title="film?.title"
        :id="film?.id"
      />

      <!-- Texte affiché ou non -->
      <CardMovieText
        v-if="showText"
        :title="film?.title"
        :overview="film?.overview"
      />

      <!-- Actions en absolute, backdrop -->
      <div
        v-if="(showAddSeen || showAddWatchlist || showRemoveWatchlist) && film"
        class="absolute bottom-0 left-0 right-0 px-4 py-4 flex justify-between items-center backdrop-blur-md bg-neutral-900/90 z-20"
      >
        <CardAddToSeen v-if="showAddSeen" :film="film" />
        <div class="flex items-center gap-3">
          <CardAddToWatchlist v-if="showAddWatchlist" :film="film" />
          <CardRemoveFromWatchlist v-if="showRemoveWatchlist" :film="film" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    film?: {
      title: string;
      release_date: string;
      overview: string;
      poster?: string | null; // ✅ URL complète
      id: number;
    };
    loading?: boolean;
    showAddSeen?: boolean;
    showAddWatchlist?: boolean;
    showRemoveWatchlist?: boolean;
    showText?: boolean;
  }>(),
  {
    showText: true,
  }
);
</script>
