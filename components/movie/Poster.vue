<template>
  <img
    v-if="posterPath"
    :src="`https://image.tmdb.org/t/p/w500${posterPath}`"
    :alt="title"
    class="w-full h-full object-cover rounded-xl"
  />
  <div
    v-else
    class="w-full h-full bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-400"
  >
    Pas d'affiche
  </div>
</template>

<script setup lang="ts">
defineProps<{
  posterPath: string | null;
  title: string;
}>();
</script>
