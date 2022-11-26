<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute();
console.log();
useHead({
  bodyAttrs: {
    class: route.path.includes("ar") ? "madina" : "ubuntu",
  },
});
</script>
