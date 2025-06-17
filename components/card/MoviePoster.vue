<template>
  <div class="relative w-full h-full group overflow-hidden">
    <NuxtLink
      v-if="id"
      :to="`/movie/${id}`"
      class="absolute inset-0 z-20"
    ></NuxtLink>

    <img
      v-if="poster"
      :src="poster"
      :alt="`Affiche de ${title}`"
      class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
    <div
      v-else
      class="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-400 italic text-xs"
    >
      Aucune affiche disponible
    </div>

    <!-- Dégradé bas vers haut -->
    <div
      class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  poster?: string | null;
  title?: string;
  id?: number | string;
}>();
</script>
