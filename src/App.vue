<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { fetchStore } from "./store";
import { reloadEmojis } from "./services/emoji";

export default defineComponent({
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
