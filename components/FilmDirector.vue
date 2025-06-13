<template>
  <div v-if="director" class="pt-4 border-t border-white/10 px-4 pb-4">
    <h2 class="text-xl font-semibold pb-2">Réalisateur</h2>
    <div class="flex items-center gap-4">
      <img
        v-if="director.profile_path"
        :src="`https://image.tmdb.org/t/p/w185${director.profile_path}`"
        :alt="director.name"
        class="w-24 h-24 rounded-full object-cover border border-white/10"
      />
      <div>
        <p class="text-white text-lg font-semibold">{{ director.name }}</p>
        <p class="text-neutral-400 text-sm">Direction</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  director: {
    name: string;
    profile_path: string | null;
  } | null;
}>();
</script>
