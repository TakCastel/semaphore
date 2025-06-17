<template>
  <footer class="text-center text-neutral-500 text-sm py-10">
    © 2024 — Bon film 🍿 — v{{ version }}
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const version = config.public.version;
</script>
