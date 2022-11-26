<template>
  <div class="container">
    <header class="flex justify-end items-center">
      <select @change="changeLang" v-model="choosedLang">
        <option class="font-ubuntu" value="en">English</option>
        <option value="ar">العربية</option>
      </select>
      <div class="font-change">
        <button @click="changeFont('less')">
          <img
            width="50px"
            src="~/assets/icons/decrease-font-size.svg"
            alt="decrease-font-size.svg"
          />
        </button>
        <button @click="changeFont('more')">
          <img
            width="50px"
            src="~/assets/icons/increase-font-size.svg"
            alt="increase-font-size.svg"
          />
        </button>
      </div>
    </header>

    <ContentQuery
      :key="route.params.id"
      path="/hadith"
      :where="{ no: Number(route.params.id) }"
      v-slot="{ data }"
      find="one"
    >
      <ContentRenderer :value="data">
        <main class="container mx-auto">
          <Head>
            <Title>{{ $t("pageTitle") }} {{ data.no }}</Title>
          </Head>

          <section class="mb-5">
            <h1 class="text-2xl underline font-bold mb-3">
              {{ data[locale].title }}
            </h1>
            <p v-if="locale === 'en'" class="my-2 font-madina">
              {{ data["ar"].text }}
            </p>
            <p class="font-bold">{{ data[locale].text }}</p>
          </section>

          <section class="flex items-center justify-between mb-5">
            <h3 class="text-2xl underline font-bold mb-3">
              {{ $t("listenTo") }}
            </h3>

            <audio id="audio" controls>
              <source :src="`/sounds/${data.no}.mp3`" type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </section>
          <section class="mb-5">
            <h3 class="text-2xl underline font-bold mb-3">
              {{ $t("explaination") }}
            </h3>
            <iframe
              v-for="vid in data[locale].video"
              :key="locale + vid.video"
              class="my-3"
              width="100%"
              height="315"
              :src="vid.video"
              :title="data[locale].title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </section>
        </main>
      </ContentRenderer>
    </ContentQuery>
    <div class="flex justify-between items-center">
      <button :disabled="Number(route.params.id) === 1" @click="go('before')">
        {{ $t("before") }}
      </button>
      <button :disabled="Number(route.params.id) === 42" @click="go('next')">
        {{ $t("next") }}
      </button>
    </div>
    <footer>
      <p class="text-center my-3 text-sm">
        icons source
        <a target="_blank" href="www.thenounproject.com">thenounproject.com</a>
      </p>
    </footer>
  </div>
</template>

<script setup async>
import { ref } from "vue";
const { locale } = useI18n();
const router = useRouter();

const choosedLang = ref(locale.value);
const route = useRoute();
const localePath = useLocalePath();
const changeLang = () => {
  locale.value = choosedLang.value;
  console.log(localePath(route.path));
  router.push(localePath(route.path));
};

const go = (val) => {
  if (val === "next") {
    router.push(`/hadith/${Number(route.params.id) + 1}`);
  } else {
    router.push(`/hadith/${Number(route.params.id) - 1}`);
  }
  // refresh();
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
