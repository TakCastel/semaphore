<template>
  <div class="max-w-5xl mx-auto space-y-8 p-4 animate-pulse">
    <!-- Affiche + titre -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Image -->
      <div
        class="w-full lg:w-1/2 lg:max-w-xs aspect-[2/3] bg-neutral-800 rounded-xl"
      />

      <!-- Texte -->
      <div class="flex-1 space-y-4">
        <div class="h-6 w-3/4 bg-neutral-800 rounded" />
        <div class="h-4 w-1/2 bg-neutral-800 rounded" />
        <div class="flex gap-2">
          <div class="h-6 w-20 bg-neutral-800 rounded-full" />
          <div class="h-6 w-20 bg-neutral-800 rounded-full" />
        </div>
        <div class="space-y-2">
          <div class="h-4 w-full bg-neutral-800 rounded" />
          <div class="h-4 w-5/6 bg-neutral-800 rounded" />
          <div class="h-4 w-2/3 bg-neutral-800 rounded" />
        </div>
        <div class="flex gap-4 pt-2">
          <div class="h-10 w-40 bg-neutral-800 rounded-full" />
          <div class="h-10 w-28 bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Casting -->
    <div class="space-y-2 px-4">
      <div class="h-5 w-40 bg-neutral-800 rounded" />
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex flex-col items-center space-y-2"
        >
          <div class="w-20 h-20 rounded-full bg-neutral-800" />
          <div class="h-4 w-16 bg-neutral-800 rounded" />
          <div class="h-3 w-12 bg-neutral-700 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
