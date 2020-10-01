<template>
  <div class="root" :style="style">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "./store";
import { Themes } from "./theme";
import { reloadEmojis } from "./services/emoji";
import TheHeader from "./components/TheHeader.vue";

export default defineComponent({
  components: {
    "the-header": TheHeader,
  },
  setup() {
    const store = useStore();
    reloadEmojis(store);
    watch(
      () => store.workspace.current(),
      () => reloadEmojis(store)
    );

    const style = computed(() => Themes[store.preference.theme()]);

    return {
      style,
    };
  },
});
</script>

<style scoped lang="postcss">
.root {
  color: var(--color-text-primary);
  background-color: var(--color-background);
  min-height: 100vh;
  padding-bottom: 48px;
}
</style>
