<template>
  <div v-if="cast.length" class="space-y-2 px-4">
    <h2 class="text-xl font-semibold border-b border-white/10 pb-2">
      Casting principal
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <div
        v-for="actor in cast.slice(0, 10)"
        :key="actor.id"
        class="flex flex-col items-center text-center text-sm text-neutral-300"
      >
        <template v-if="actor.profile_path">
          <img
            :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
            :alt="actor.name"
            class="w-24 h-24 rounded-full object-cover mb-2 border border-white/10"
          />
        </template>
        <template v-else>
          <div
            class="w-24 h-24 rounded-full bg-white/10 text-white font-semibold flex items-center justify-center mb-2 text-xl border border-white/10"
          >
            {{ getInitials(actor.name) }}
          </div>
        </template>

        <div class="font-medium">{{ actor.name }}</div>
        <div class="text-neutral-500 text-xs">{{ actor.character }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path?: string | null;
  }[];
}>();

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
</script>
