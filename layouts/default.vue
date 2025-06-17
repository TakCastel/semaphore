<template>
  <div
    class="min-h-screen flex flex-col bg-neutral-950 text-white font-sans pt-[80px]"
  >
    <!-- Header -->
    <HeaderBase
      :filters-open="filtersOpen"
      @update:filters-open="filtersOpen = $event"
    />

    <Client-only>
      <FiltersPanel :open="filtersOpen" @close="filtersOpen = false" />
    </Client-only>

    <!-- Contenu principal -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <FooterBase />
  </div>
</template>

<script setup lang="ts">
const filtersOpen = ref(false);
</script>
