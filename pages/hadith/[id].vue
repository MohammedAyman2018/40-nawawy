<template>
  <div class="container">
    <page-header />
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
    <navigation-btns />
    <footer>
      <p class="text-center my-3 text-sm">
        icons source
        <a target="_blank" href="www.thenounproject.com">thenounproject.com</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import pageHeader from "@/components/HadithPage/PageHeader.vue";
import NavigationBtns from "@/components/HadithPage/NavigationBtns.vue";
import { ref } from "vue";
const { locale } = useI18n();

const route = useRoute();
</script>
