<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="genre in genres"
      :key="genre.id"
      class="px-3 py-1 bg-neutral-800 rounded-full text-sm"
    >
      {{ genre.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  genres: any[];
}>();
</script>
