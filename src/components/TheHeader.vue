<template>
  <header class="the-header">
    <nav class="inner container">
      <router-link to="/" class="logo">
        <img
          src="/src/assets/images/ico-logo.png"
          alt="slack emoji viewer"
          class="icon"
        />
      </router-link>
      <div class="spacer" />
      <button class="item" title="update emoji database">
        <mdi-icon :path="mdiReload" @click="reloadEmojis" />
      </button>
      <router-link to="/preferences" class="item">
        <mdi-icon :path="mdiCog" size="32px" />
      </router-link>
      <workspace-selector />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WorkspaceSelector from "../components/WorkspaceSelector.vue";
import { mdiReload, mdiCog } from "@mdi/js";
import { reloadEmojis } from "../services/emoji";
import { useStore } from "../store";

export default defineComponent({
  components: {
    "workspace-selector": WorkspaceSelector,
  },
  setup() {
    const store = useStore();
    return {
      reloadEmojis: () => reloadEmojis(store),

      mdiReload,
      mdiCog,
    };
  },
});
</script>

<style lang="postcss" scoped>
.the-header {
  background-color: var(--color-panel);
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  margin-bottom: 24px;
}

.container {
  display: flex;
  height: 64px;
  align-items: center;
}

.spacer {
  flex-grow: 1;
}

.item {
  margin-right: 16px;
}

.logo {
  & .icon {
    width: 48px;
    height: 48px;
  }
}
</style>
