<template>
  <div class="container flex justify-between items-center">
    <button
      class="flex items-center"
      :disabled="Number(route.params.id) === 1"
      @click="go('before')"
    >
      <img
        width="20"
        class="inline-block mx-1"
        src="~/assets/icons/back.svg"
        alt="before"
      />
      {{ $t("before") }}
    </button>
    <button
      class="flex items-center"
      :disabled="Number(route.params.id) === 42"
      @click="go('next')"
    >
      {{ $t("next") }}
      <img
        width="20"
        class="inline-block mx-1"
        style="transform: rotate(180deg)"
        src="~/assets/icons/back.svg"
        alt="before"
      />
    </button>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();

const go = (val) => {
  if (val === "next") {
    router.push(localePath(`/hadith/${Number(route.params.id) + 1}`));
  } else {
    router.push(localePath(`/hadith/${Number(route.params.id) - 1}`));
  }
};
</script>

<style></style>
