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
      <div class="spacer"></div>
      <button class="item">
        <reload-icon></reload-icon>
      </button>
      <router-link to="/preferences" class="item">
        <cog-icon size="32px"></cog-icon>
      </router-link>
      <workspace-selector></workspace-selector>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WorkspaceSelector from "../components/WorkspaceSelector.vue";
import ReloadIcon from "../components/icons/ReloadIcon.vue";
import CogIcon from "../components/icons/CogIcon.vue";

export default defineComponent({
  components: {
    "workspace-selector": WorkspaceSelector,
    "reload-icon": ReloadIcon,
    "cog-icon": CogIcon,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.the-header {
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
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
