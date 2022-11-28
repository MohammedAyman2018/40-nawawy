<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute();
console.log(route.fullPath);
useHead({
  bodyAttrs: {
    class: route.path.includes("ar") ? "madina" : "ubuntu",
  },
  htmlAttrs: {
    title: route.path.includes("ar") ? "الأربعون النووية" : "40 Nawawy hadith",
    dir: route.path.includes("ar") ? "rtl" : "ltr",
    lang: route.path.includes("ar") ? "ar" : "en",
  },
});
</script>
