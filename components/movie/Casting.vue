<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">Casting</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
      <div
        v-for="actor in cast.slice(0, 10)"
        :key="actor.id"
        class="text-center"
      >
        <div class="w-full aspect-[2/3] rounded overflow-hidden">
          <NuxtLink v-if="actor.profile_path" :to="`/actor/${actor.id}`">
            <img
              :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
              :alt="actor.name"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
          <div
            v-else
            class="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs"
          >
            Pas d'image
          </div>
        </div>
        <div class="mt-2 text-sm font-medium">{{ actor.name }}</div>
        <div class="text-xs text-neutral-400">{{ actor.character }}</div>
      </div>
    </div>

    <div v-if="director" class="mt-8">
      <h3 class="text-xl font-bold">Réalisateur</h3>
      <div class="flex items-center gap-4 mt-2">
        <div class="w-20 h-20 rounded-full overflow-hidden">
          <img
            v-if="director.profile_path"
            :src="`https://image.tmdb.org/t/p/w185${director.profile_path}`"
            :alt="director.name"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs rounded-full"
          >
            -
          </div>
        </div>
        <span class="text-lg">{{ director.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cast: any[];
  director: { name: string; profile_path: string | null } | null;
}>();
</script>
