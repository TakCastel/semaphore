<template>
  <div class="max-w-5xl mx-auto space-y-8 p-4 animate-pulse">
    <!-- Affiche + contenu -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Affiche -->
      <div
        class="w-full lg:w-1/2 lg:max-w-xs aspect-[2/3] bg-neutral-800 rounded-xl"
      />

      <!-- Colonne de texte -->
      <div class="flex-1 space-y-4">
        <!-- Titre -->
        <div class="h-8 w-2/3 bg-neutral-800 rounded" />

        <!-- Infos -->
        <div class="flex flex-wrap gap-2">
          <div class="h-4 w-16 bg-neutral-800 rounded" />
          <div class="h-4 w-20 bg-neutral-800 rounded" />
          <div class="h-4 w-24 bg-neutral-800 rounded" />
        </div>

        <!-- Genres -->
        <div class="flex flex-wrap gap-2">
          <div class="h-6 w-20 bg-neutral-800 rounded-full" />
          <div class="h-6 w-20 bg-neutral-800 rounded-full" />
        </div>

        <!-- Synopsis -->
        <div class="space-y-2">
          <div class="h-4 w-full bg-neutral-800 rounded" />
          <div class="h-4 w-5/6 bg-neutral-800 rounded" />
          <div class="h-4 w-2/3 bg-neutral-800 rounded" />
        </div>

        <!-- Providers -->
        <div class="space-y-2">
          <div class="h-6 w-32 bg-neutral-800 rounded" />
          <div class="flex flex-wrap gap-4">
            <div class="h-8 w-28 bg-neutral-800 rounded-full" />
            <div class="h-8 w-28 bg-neutral-800 rounded-full" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 pt-2">
          <div class="h-10 w-40 bg-neutral-800 rounded-full" />
          <div class="h-10 w-28 bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Casting -->
    <div class="space-y-4 px-4">
      <div class="h-6 w-40 bg-neutral-800 rounded" />
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <div
          v-for="i in 10"
          :key="i"
          class="flex flex-col items-center space-y-2"
        >
          <div class="w-full aspect-[2/3] bg-neutral-800 rounded" />
          <div class="h-4 w-20 bg-neutral-800 rounded" />
          <div class="h-3 w-16 bg-neutral-700 rounded" />
        </div>
      </div>
    </div>

    <!-- Réalisateur -->
    <div class="space-y-2 px-4">
      <div class="h-6 w-40 bg-neutral-800 rounded" />
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-neutral-800" />
        <div class="h-4 w-32 bg-neutral-800 rounded" />
      </div>
    </div>
  </div>
</template>
