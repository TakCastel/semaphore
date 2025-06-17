<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-3 hover:opacity-80 transition z-50"
  >
    <img src="/logo.png" alt="La Bobinothèque" class="h-6 md:h-10 w-auto" />
    <span
      class="text-red-600 font-logo text-xl md:text-3xl tracking-wide uppercase"
    >
      La Bobithèque
    </span>
  </NuxtLink>
</template>

<style scoped>
.font-logo {
  font-family: "Anton", sans-serif;
  font-weight: 400;
  letter-spacing: 0.08em;
}
</style>
