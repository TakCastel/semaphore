<template>
  <nav
    class="fixed top-0 bg-neutral-950 border-b border-neutral-800 px-4 py-3 w-full z-50"
  >
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <AppLogo />

      <HeaderBurger :open="open" @toggle="toggle" />
      <HeaderMenu :open="open" @close="close" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";
import HeaderBurger from "@/components/HeaderBurger.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";

const open = ref(false);

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}
</script>
