<template>
  <main class="inner">
    <list-tab list-type="user" />
    <card>
      <page
        v-model:trimmed="trimmed"
        :max-height="maxHeight"
        @changed="resetHeight"
      />
      <load-more-button v-if="trimmed" @click="load" />
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import LoadMoreButton from "../components/LoadMoreButton.vue";
import User from "../components/lists/User.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    "load-more-button": LoadMoreButton,
    page: User,
  },
  setup() {
    const trimmed = ref(false);
    const maxHeight = ref(800);
    const resetHeight = () => (maxHeight.value = 800);

    const load = (e: Event) => {
      (e.target as HTMLElement).blur();
      maxHeight.value += 800;
    };

    return {
      trimmed,
      maxHeight,
      resetHeight,
      load,
    };
  },
});
</script>

<style scoped lang="postcss"></style>
