<template>
  <button
    @click="$emit('toggle')"
    class="xl:hidden text-neutral-300 text-3xl z-50 relative flex items-center justify-center cursor-pointer p-1"
  >
    <Icon :name="open ? 'lucide:x' : 'lucide:menu'" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
</script>
