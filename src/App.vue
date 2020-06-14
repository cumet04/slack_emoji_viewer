<template>
  <div id="root">
    <the-sidebar id="nav" />
    <router-view id="main" />
    <the-board id="board" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { fetchStore } from "./store";
import { reloadEmojis } from "./services/emoji";
import TheSidebarComponent from "./components/TheSidebar.vue";
import TheBoardComponent from "./components/TheBoard.vue";

export default defineComponent({
  components: {
    "the-sidebar": TheSidebarComponent,
    "the-board": TheBoardComponent,
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
#root {
  display: flex;
  position: relative;
  flex-direction: row;
}

#nav {
  position: sticky;
  top: 0;
  width: 200px;
  height: 100vh;
}

#main {
  width: 768px;
  padding: 24px;
}

#board {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
