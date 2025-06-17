<template>
  <button
    v-if="isHome"
    class="inline-flex items-center gap-3 px-4 py-2 backdrop-blur bg-neutral-900/90 text-neutral-500 font-semibold transition hover:bg-neutral-800 cursor-pointer tab-inverted shadow-lg"
    @click="$emit('update:open', !open)"
  >
    <Icon name="lucide:sliders-horizontal" class="text-xl" />
    <span class="hidden sm:inline whitespace-nowrap text-left"> Filtres </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["update:open"]);

// Visible seulement sur la page d'accueil
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<style scoped>
.tab-inverted {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 1rem;
  position: relative;
}
</style>
