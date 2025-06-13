<template>
  <p
    class="inline text-sm text-white/90 italic bg-black/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm border border-white/10 lg:border-white/30"
  >
    {{ formattedDate }} · {{ runtime }} min ·
    <span class="inline-flex items-center gap-1">
      {{ languageFlag }} {{ languageName }}
    </span>
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  releaseDate: string;
  runtime: number;
  language: string;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.releaseDate);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const languageFlag = computed(() => {
  const map: Record<string, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
    ja: "🇯🇵",
    es: "🇪🇸",
    de: "🇩🇪",
    it: "🇮🇹",
    zh: "🇨🇳",
    ko: "🇰🇷",
    ru: "🇷🇺",
    ar: "🇸🇦",
    hi: "🇮🇳",
  };
  return map[props.language] || "🎬";
});

const languageName = computed(() => props.language.toUpperCase());
</script>
