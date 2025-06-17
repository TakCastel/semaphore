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
      <CardMovieText :title="film?.title" :overview="film?.overview" />

      <!-- Actions en absolute, backdrop -->
      <div
        class="absolute bottom-0 left-0 right-0 px-4 py-4 flex justify-between items-center backdrop-blur-md bg-black/50 z-20"
      >
        <CardAddToSeen v-if="showAddSeen" />
        <div class="flex items-center gap-3">
          <CardAddToWatchlist v-if="showAddWatchlist" />
          <CardRemoveFromWatchlist v-if="showRemoveWatchlist" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  film?: {
    title: string;
    release_date: string;
    overview: string;
    poster?: string | null;
    id: number;
  };
  loading?: boolean;
  showAddSeen?: boolean;
  showAddWatchlist?: boolean;
  showRemoveWatchlist?: boolean;
}>();
</script>
