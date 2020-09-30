<template>
  <main class="inner">
    <list-tab list-type="all"></list-tab>
    <card>
      <page
        v-model:trimmed="trimmed"
        :max-rows="maxRows"
        @changed="resetRows"
      ></page>
      <div v-if="trimmed" class="load">
        <button class="button" @click="load">load more</button>
      </div>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import AllPage from "../components/lists/All.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    page: AllPage,
  },
  setup() {
    const trimmed = ref(false);

    const maxRows = ref(20);
    const resetRows = () => (maxRows.value = 20);

    const load = (e: Event) => {
      (e.target as HTMLElement).blur();
      maxRows.value += 10;
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
.load {
  margin-top: 16px;

  & .button {
    margin: 0 auto;
    width: 100px;
    height: 32px;
    border-radius: 16px;

    font-size: 1.4rem;
    color: var(--color-text-label);
    background-color: var(--color-primary);
  }
}
</style>
