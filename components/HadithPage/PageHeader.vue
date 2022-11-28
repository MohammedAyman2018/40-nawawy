<template>
  <header class="flex justify-end items-center">
    <button @click="showLangDropDown = !showLangDropDown">
      <img width="50" src="~/assets/icons/settings.svg" alt="settings" />
    </button>
    <div
      class="h-full w-full fixed top-0 left-0 flex justify-center items-center z-40"
      v-if="showLangDropDown"
    >
      <div
        @click="showLangDropDown = false"
        class="bg-black w-full h-full fixed z-10 opacity-75"
      ></div>
      <div class="p-5 w-1/2 h-1/2 bg-white rounded-lg shadow z-20">
        <h3 class="text-2xl text-center underline font-bold">الإعدادات</h3>
        <div>
          <h4>اللغة:</h4>
          <button @click="changeLang('en')" class="font-ubuntu">
            <img width="50" src="~/assets/icons/english.svg" alt="english" />
          </button>
          <button class="mx-1" @click="changeLang('ar')">
            <img width="50" src="~/assets/icons/arabic.svg" alt="arabic" />
          </button>
        </div>
        <div>
          <h4>حجم الخط:</h4>
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
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
const { locale } = useI18n();

const switchLocalePath = useSwitchLocalePath();

const showLangDropDown = ref(false);
const changeLang = async (val) => {
  await navigateTo(switchLocalePath(val));
  window.location.reload();
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
