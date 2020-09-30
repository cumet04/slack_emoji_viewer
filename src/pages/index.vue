<template>
  <main class="inner">
    <card class="card">
      <all-page :max-rows="6"></all-page>
      <router-link to="/all" class="link">view more</router-link>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import AllPage from "../components/lists/All.vue";

export default defineComponent({
  components: {
    card: Card,
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
