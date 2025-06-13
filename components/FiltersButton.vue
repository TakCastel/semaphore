<template>
  <button
    class="group cursor-pointer relative flex items-center justify-center xl:justify-start min-w-14 min-h-14 xl:min-w-0 xl:min-h-0 px-0 xl:pl-2 xl:pr-4 py-0 xl:py-2 rounded-full bg-gradient-to-b from-neutral-500 to-neutral-700 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
    @click="$emit('update:open', !open)"
  >
    <span
      class="bg-white rounded-full w-7 h-7 flex items-center justify-center shrink-0"
    >
      <icon name="lucide:sliders-horizontal" class="w-5 h-5 text-black" />
    </span>
    <span class="hidden xl:inline-block whitespace-nowrap pl-2 text-left">
      Filtres
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
defineEmits(["update:open"]);
</script>
