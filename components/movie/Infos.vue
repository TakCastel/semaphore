<template>
  <div class="flex flex-wrap gap-2 text-sm text-neutral-400">
    <span v-if="releaseDate">{{ new Date(releaseDate).getFullYear() }}</span>
    <span v-if="runtime">• {{ runtime }} min</span>
    <span v-if="language">• Langue : {{ language.toUpperCase() }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  releaseDate: string;
  runtime: number;
  language: string;
}>();
</script>
