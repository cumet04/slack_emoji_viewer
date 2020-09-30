<template>
  <main class="inner">
    <card class="card">
      <daily-page :max-height="300"></daily-page>
      <router-link to="/daily" class="link">view more</router-link>
    </card>
    <card class="card">
      <all-page :max-rows="6"></all-page>
      <router-link to="/all" class="link">view more</router-link>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import DailyPage from "../components/lists/Daily.vue";
import AllPage from "../components/lists/All.vue";

export default defineComponent({
  components: {
    card: Card,
    "daily-page": DailyPage,
    "all-page": AllPage,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="postcss">
.link {
  display: block;
  margin-top: 8px;
  font-size: 1.2rem;
  color: var(--color-info);
}
</style>
