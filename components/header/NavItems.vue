<template>
  <div :class="wrapClass">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :class="linkClasses(item)"
      @click="onClick"
    >
      <Icon :name="item.icon" :class="iconSize" />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  vertical?: boolean;
  iconSize?: string;
}>();

const emit = defineEmits(["click"]);
const route = useRoute();

const wrapClass = props.vertical
  ? "flex flex-col items-start gap-6 text-left px-6 pt-8 md:pt-10 pb-5 backdrop-blur"
  : "flex items-center gap-8 text-neutral-300 xl:flex hidden";

const iconSize = props.iconSize || "";

const items = [
  { to: "/", icon: "lucide:film", label: "Accueil" },
  { to: "/saved", icon: "lucide:bookmark", label: "Sauvegardés" },
  { to: "/seen", icon: "lucide:square-check", label: "Déjà vus" },
];

function linkClasses(item: any) {
  return [
    "flex items-center gap-2 hover:text-red-600 transition",
    { "text-red-600": route.path === item.to },
  ];
}

function onClick() {
  emit("click");
}
</script>
