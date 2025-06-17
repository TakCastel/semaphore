<template>
  <div class="fixed top-0 w-full px-4 py-4 z-50">
    <!-- PILL : max-w + shadow -->
    <div
      class="relative max-w-6xl mx-auto flex items-center justify-between bg-neutral-900 rounded-full px-6 py-3 shadow-xl z-50"
    >
      <HeaderLogo />
      <HeaderNavDesktop class="hidden xl:block" />
      <HeaderNavMobile class="block xl:hidden" />
    </div>

    <div class="relative max-w-6xl mx-auto">
      <div class="top-full absolute left-7 flex z-40">
        <HeaderNewFilm class="shadow-md z-40" />
        <HeaderFilters
          class="shadow-md z-40"
          :open="filtersOpen"
          @update:open="$emit('update:filters-open', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  filtersOpen: Boolean,
});
defineEmits(["update:filters-open"]);
</script>
