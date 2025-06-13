<template>
  <!-- Desktop -->
  <div class="hidden xl:flex gap-6 text-xl text-neutral-300 items-center">
    <NuxtLink
      to="/"
      class="hover:text-red-600 transition flex items-center gap-2"
      :class="{ 'text-red-600': $route.path === '/' }"
      aria-label="Accueil"
    >
      <Icon name="lucide:film" />
      <span class="sr-only">Accueil</span>
    </NuxtLink>
    <NuxtLink
      to="/saved"
      class="hover:text-red-600 transition flex items-center gap-2"
      :class="{ 'text-red-600': $route.path === '/saved' }"
      aria-label="Films sauvegardés"
    >
      <Icon name="lucide:bookmark" />
      <span class="sr-only">Films sauvegardés</span>
    </NuxtLink>
  </div>

  <!-- Mobile fullscreen -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-8 text-white text-2xl z-40"
    >
      <NuxtLink
        to="/"
        class="hover:text-red-600 transition flex flex-col items-center"
        :class="{ 'text-red-600': $route.path === '/' }"
        @click="$emit('close')"
      >
        <Icon name="lucide:film" class="text-4xl" />
        <span>Accueil</span>
      </NuxtLink>

      <NuxtLink
        to="/saved"
        class="hover:text-red-600 transition flex flex-col items-center"
        :class="{ 'text-red-600': $route.path === '/saved' }"
        @click="$emit('close')"
      >
        <Icon name="lucide:bookmark" class="text-4xl" />
        <span>Films sauvegardés</span>
      </NuxtLink>
    </div>
  </transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

defineProps<{ open: boolean }>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
