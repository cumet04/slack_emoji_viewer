<template>
  <aside class="nav">
    <header class="header">
      <workspace-selector></workspace-selector>
    </header>
    <ol class="menu">
      <li
        v-for="menu in menus"
        :key="menu.name"
        class="item"
        :class="currentClass(menu.url)"
      >
        <router-link :to="menu.url" class="link">
          {{ menu.name }}
        </router-link>
      </li>
    </ol>
    <footer class="footer">
      <a
        href="https://github.com/cumet04/slack_emoji_viewer"
        target="_blank"
        class="github_link"
      >
        <img src="/src/assets/images/ico-github.png" alt="" class="icon" />
      </a>
    </footer>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import WorkspaceSelectorComponent from "../components/WorkspaceSelector.vue";

export default defineComponent({
  components: {
    "workspace-selector": WorkspaceSelectorComponent,
  },
  setup() {
    return {
      menus: [
        { name: "index", url: "/" },
        { name: "daily", url: "/daily" },
        { name: "by author", url: "/author" },
        { name: "settings", url: "/settings" },
      ],
      currentClass(path: string) {
        return useRoute().path == path ? "current" : "";
      },
    };
  },
});
</script>

<style scoped lang="postcss">
.nav {
  display: flex;
  flex-direction: column;
  border-right: lightgray solid 1px;
}

.menu {
  padding-top: 12px;
  border-top: #eee solid 1px;

  & .item {
    &:hover {
      background-color: #eee;
    }

    &.current {
      background-color: lightskyblue;
    }

    & .link {
      display: block;
      padding: 2px 20px;

      &:hover {
        text-decoration: none;
      }

      &::before {
        content: "#";
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-end;

  padding: 8px 0;
}

.github_link {
  width: 24px;
  height: 24px;

  & .icon {
    width: 100%;
    height: 100%;
  }
}
</style>
