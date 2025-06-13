<template>
  <div class="absolute top-3 right-3 z-30 flex flex-col items-end gap-3">
    <button
      v-if="!loading && !showRemove"
      class="group cursor-pointer relative flex items-center justify-center xl:justify-start min-w-14 min-h-14 xl:min-w-0 xl:min-h-0 px-0 xl:pl-2 xl:pr-4 py-0 xl:py-2 rounded-full bg-gradient-to-b from-green-400 to-green-600 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
      @click.stop="$emit('save')"
    >
      <span
        class="bg-white rounded-full w-7 h-7 flex items-center justify-center shrink-0"
      >
        <Icon name="fluent-emoji:red-heart" class="w-5 h-5" />
      </span>
      <span class="hidden xl:inline-block whitespace-nowrap pl-2 text-left">
        Ça m'intéresse
      </span>
    </button>

    <button
      v-if="!loading && showRemove && filmId"
      class="group cursor-pointer relative flex items-center justify-center xl:justify-start min-w-14 min-h-14 xl:min-w-0 xl:min-h-0 px-0 xl:pl-2 xl:pr-4 py-0 xl:py-2 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition duration-200 font-semibold text-base"
      @click.stop="$emit('remove')"
    >
      <span
        class="bg-white rounded-full w-7 h-7 flex items-center justify-center shrink-0"
      >
        <Icon name="fluent-emoji:cross-mark" class="w-5 h-5" />
      </span>
      <span class="hidden xl:inline-block whitespace-nowrap pl-2 text-left">
        Retirer
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  filmId?: number;
  loading?: boolean;
  showRemove?: boolean;
}>();
</script>
