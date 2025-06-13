<template>
  <p class="text-neutral-200 text-base leading-relaxed">
    {{ overview || "Aucun résumé disponible." }}
  </p>
</template>

<script setup lang="ts">
defineProps<{ overview?: string }>();
</script>
