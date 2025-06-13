<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="genre in genres"
      :key="genre.id"
      class="text-sm px-3 py-1 bg-black/60 text-white rounded-full backdrop-blur-sm shadow-sm border border-white/10 lg:border-white/30"
    >
      {{ genre.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  genres: { id: number; name: string }[];
}>();
</script>
