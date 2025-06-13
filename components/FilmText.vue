<template>
  <div
    class="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 text-left text-white cursor-pointer select-none"
    @click="$emit('toggle')"
  >
    <h2
      class="text-lg font-semibold leading-tight mb-1 transition-all duration-300"
    >
      {{ title }}
    </h2>

    <transition
      name="slide-expand"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        v-show="expanded"
        class="text-neutral-200 text-sm leading-none overflow-hidden"
      >
        {{ overview || "Aucune description disponible." }}
      </div>
    </transition>

    <div
      v-show="!expanded"
      class="text-sm text-neutral-300 leading-snug flex items-center"
    >
      <span class="truncate" :style="`max-width: ${truncateWidth}px`">
        {{ overview }}
      </span>
      <span class="ml-1 text-white/70 text-xs shrink-0 underline"
        >Voir plus</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  overview?: string;
  expanded: boolean;
  truncateWidth: number;
}>();

function beforeEnter(el: Element) {
  el.style.height = "0";
}
function enter(el: Element) {
  const height = el.scrollHeight;
  el.style.transition = "height 0.3s ease";
  el.style.height = height + "px";
}
function leave(el: Element) {
  el.style.transition = "height 0.3s ease";
  el.style.height = "0";
}
</script>

<style scoped>
.slide-expand-enter-active,
.slide-expand-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>
