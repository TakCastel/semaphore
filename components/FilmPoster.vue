<template>
  <div class="relative aspect-[2/3] overflow-hidden">
    <img
      v-if="poster"
      :src="poster"
      :alt="`Affiche de ${title}`"
      class="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
    <div
      v-else
      class="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-400 italic text-xs"
    >
      Aucune affiche disponible
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent z-10"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ poster?: string | null; title?: string }>();
</script>
