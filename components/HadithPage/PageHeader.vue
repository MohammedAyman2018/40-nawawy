<template>
  <header class="flex justify-end items-center">
    <select @change="changeLang" v-model="choosedLang">
      <option class="font-ubuntu" value="en">English</option>
      <option value="ar">العربية</option>
    </select>
    <div class="font-change">
      <button type="button" @click="changeFont('less')">
        <img
          width="50"
          src="~/assets/icons/decrease-font-size.svg"
          alt="decrease-font-size.svg"
        />
      </button>
      <button type="button" @click="changeFont('more')">
        <img
          width="50"
          src="~/assets/icons/increase-font-size.svg"
          alt="increase-font-size.svg"
        />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
const { locale } = useI18n();

const choosedLang = ref(locale.value);
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const changeLang = () => {
  router.push(switchLocalePath(choosedLang.value));
};
const changeFont = (changeType) => {
  const currentFontSize = document.body.style.fontSize;
  const fonts = [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
  ];
  let idx = fonts.indexOf(currentFontSize);
  if (idx === -1) idx = 3;
  if (
    (idx === 0 && changeType !== "more") ||
    (idx === 6 && changeType === "more")
  )
    return; // TODO: handle error
  console.log("-===== > ", idx, changeType, fonts[idx + 1], fonts[idx - 1]);
  document.body.style.fontSize =
    changeType === "more" ? fonts[idx + 1] : fonts[idx - 1];
};
</script>

<style></style>
