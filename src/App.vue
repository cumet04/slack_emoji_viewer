<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { fetchStore } from "./store";
import { reloadEmojis } from "./services/emoji";
import TheHeader from "./components/TheHeader.vue";

export default defineComponent({
  components: {
    "the-header": TheHeader,
  },
  setup() {
    const store = fetchStore();
    reloadEmojis(store);
    watch(
      () => store.workspace.current(),
      () => reloadEmojis(store)
    );

    return {};
  },
});
</script>

<style scoped lang="postcss">
</style>
