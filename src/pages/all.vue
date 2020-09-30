<template>
  <main class="inner">
    <list-tab list-type="all"></list-tab>
    <card>
      <page
        v-model:trimmed="trimmed"
        :max-rows="maxRows"
        @changed="resetRows"
      ></page>
      <load-more-button v-if="trimmed" @click="load"></load-more-button>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import LoadMoreButton from "../components/LoadMoreButton.vue";
import AllPage from "../components/lists/All.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    "load-more-button": LoadMoreButton,
    page: AllPage,
  },
  setup() {
    const trimmed = ref(false);

    const maxRows = ref(20);
    const resetRows = () => (maxRows.value = 20);

    const load = (e: Event) => {
      (e.target as HTMLElement).blur();
      maxRows.value += 20;
    };

    return {
      trimmed,

      maxRows,
      resetRows,
      load,
    };
  },
});
</script>

<style scoped lang="postcss">
</style>
