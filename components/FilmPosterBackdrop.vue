<template>
  <div
    class="w-full h-screen lg:h-auto lg:aspect-[2/3] overflow-hidden relative"
  >
    <img
      v-if="posterPath"
      :src="`https://image.tmdb.org/t/p/w780${posterPath}`"
      alt="Affiche du film"
      class="w-full h-full object-cover"
    />
    <div
      class="block lg:hidden absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent z-10"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ posterPath?: string | null }>();
</script>
