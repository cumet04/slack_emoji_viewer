<template>
  <main class="inner">
    <list-tab list-type="daily"></list-tab>
    <card>
      <page></page>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import DailyPage from "../components/lists/Daily.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    page: DailyPage,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="postcss">
</style>
