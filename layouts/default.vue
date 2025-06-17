<template>
  <div class="min-h-screen bg-neutral-950 text-white font-sans pt-[80px]">
    <HeaderBase
      :filters-open="filtersOpen"
      @update:filters-open="filtersOpen = $event"
    />

    <Client-only>
      <FiltersPanel :open="filtersOpen" @close="filtersOpen = false" />
    </Client-only>
    <slot />
  </div>
</template>

<script setup lang="ts">
const filtersOpen = ref(false);
</script>
