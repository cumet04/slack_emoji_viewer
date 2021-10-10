<template>
  <main class="inner">
    <list-tab list-type="daily" />
    <card>
      <page v-model:trimmed="trimmed" :max-height="maxHeight" />
      <load-more-button v-if="trimmed" @click="load" />
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import LoadMoreButton from "../components/LoadMoreButton.vue";
import DailyPage from "../components/lists/Daily.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    "load-more-button": LoadMoreButton,
    page: DailyPage,
  },
  setup() {
    const trimmed = ref(false);
    const maxHeight = ref(800);

    const load = (e: Event) => {
      (e.target as HTMLElement).blur();
      maxHeight.value += 800;
    };

    return {
      trimmed,
      maxHeight,
      load,
    };
  },
});
</script>

<style scoped lang="postcss"></style>
