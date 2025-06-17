<template>
  <div class="relative xl:hidden">
    <!-- Burger lié -->
    <HeaderBurger :open="open" @toggle="toggle" />

    <!-- Drawer : extension arrondie -->
    <transition name="slide-down">
      <div
        v-if="open"
        class="fixed top-12 left-4 right-4 bg-neutral-900/90 rounded-b-3xl overflow-hidden z-40 max-w-6xl mx-auto"
      >
        <HeaderNavItems vertical icon-size="text-xl" @click="close" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const open = ref(false);
const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 100vh;
}
</style>
