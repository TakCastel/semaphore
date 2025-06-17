<template>
  <div class="max-w-5xl mx-auto p-4 space-y-8 animate-pulse">
    <!-- Bloc haut : photo + infos -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Photo -->
      <div
        class="w-full lg:w-1/3 lg:max-w-xs aspect-[2/3] bg-neutral-800 rounded"
      />

      <!-- Texte infos -->
      <div class="flex-1 space-y-4">
        <div class="h-8 w-1/2 bg-neutral-800 rounded" />
        <div class="h-4 w-1/3 bg-neutral-800 rounded" />
        <div class="space-y-2">
          <div class="h-4 w-full bg-neutral-800 rounded" />
          <div class="h-4 w-5/6 bg-neutral-800 rounded" />
          <div class="h-4 w-4/6 bg-neutral-800 rounded" />
        </div>
      </div>
    </div>

    <!-- Filmographie -->
    <div class="space-y-4">
      <div class="h-6 w-40 bg-neutral-800 rounded" />
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div
          v-for="n in 10"
          :key="n"
          class="w-full aspect-[2/3] bg-neutral-800 rounded"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Aucun script requis pour le skeleton
</script>
