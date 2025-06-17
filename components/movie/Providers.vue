<template>
  <div v-if="providers?.length" class="space-y-2">
    <h3 class="text-xl font-bold">Disponible sur :</h3>
    <ul class="flex flex-wrap gap-4">
      <li
        v-for="p in providers"
        :key="p.provider_id"
        class="flex items-center gap-2"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w45${p.logo_path}`"
          :alt="p.provider_name"
          class="w-8 h-8 rounded"
        />
        <span>{{ p.provider_name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  providers: any[];
}>();
</script>
