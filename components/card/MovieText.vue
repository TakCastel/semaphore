<template>
  <div
    class="absolute left-0 right-0 z-20 px-4 text-left text-white cursor-pointer select-none transition-all duration-300 ease-in-out"
    :class="[
      expanded
        ? 'bottom-[88px] md:bottom-[72px] backdrop-blur bg-neutral-900/90 py-4'
        : 'bottom-[88px] md:bottom-[72px] pb-4',
    ]"
    @click="toggle"
  >
    <h2
      class="text-lg font-semibold leading-tight mb-1 transition-all duration-300"
    >
      {{ title }}
    </h2>

    <transition
      name="slide-up"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        v-show="expanded"
        class="text-neutral-200 text-sm leading-snug overflow-hidden"
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
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps<{
  title?: string;
  overview?: string;
}>();

const expanded = ref(false);
const cardWidth = ref(300);
const truncateWidth = computed(() => cardWidth.value * 0.6);

function toggle() {
  expanded.value = !expanded.value;
}

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

onMounted(() => {
  const el = document.querySelector(".card-container");
  if (el instanceof HTMLElement) {
    cardWidth.value = el.offsetWidth;
  }
});

// 🗝️ Ferme automatiquement quand le titre OU le texte change
watch(
  () => [props.title, props.overview],
  () => {
    expanded.value = false;
  }
);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>
