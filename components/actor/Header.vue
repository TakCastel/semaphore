<template>
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Photo de l'acteur -->
    <div class="w-full lg:w-1/3 lg:max-w-xs aspect-[2/3]">
      <img
        v-if="actor.profile_path"
        :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
        :alt="actor.name"
        class="w-full h-full object-cover rounded"
      />
      <div
        v-else
        class="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs rounded"
      >
        Pas d'image
      </div>
    </div>

    <!-- Infos principales -->
    <div class="flex-1 space-y-4">
      <h1 class="text-4xl font-bold">{{ actor.name }}</h1>

      <p v-if="actor.birthday" class="text-neutral-400">
        Né(e) le {{ actor.birthday }}
        <span v-if="actor.place_of_birth"> à {{ actor.place_of_birth }}</span>
      </p>

      <p class="text-neutral-300">
        {{ actor.biography || "Pas de biographie disponible." }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  actor: {
    name: string;
    profile_path: string | null;
    birthday?: string | null;
    place_of_birth?: string | null;
    biography?: string | null;
  };
}>();
</script>
