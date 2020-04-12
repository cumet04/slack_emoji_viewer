<template>
  <aside class="nav">
    <header class="header">
      menu
    </header>
    <ul class="menu">
      <li
        v-for="menu in menus"
        :key="menu.name"
        class="menu_item"
        :class="currentClass(menu.url)"
      >
        <nuxt-link :to="menu.url" class="menu_item_link">
          {{ menu.name }}
        </nuxt-link>
      </li>
    </ul>
    <footer class="footer">
      <a
        href="https://github.com/cumet04/slack_emoji_viewer"
        target="_blank"
        class="github_link"
      >
        <img
          src="~/assets/images/ico-github.png"
          alt=""
          class="github_link_icon"
        />
      </a>
    </footer>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "top", url: "/" },
        { name: "daily", url: "/daily" },
        { name: "by author", url: "/author" },
        { name: "settings", url: "/settings" },
      ],
    };
  },
  methods: {
    currentClass(path) {
      return $nuxt.$route.path == path ? "current" : "";
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  border-right: lightgray solid 1px;
}

.header {
  font-size: 20px;
  padding: 20px;
}

.menu {
  padding-top: 12px;
  border-top: #eee solid 1px;

  &_item {
    &:hover {
      background-color: #eee;
    }

    &.current {
      background-color: lightskyblue;
    }

    &_link {
      display: block;
      padding: 6px 20px;

      // reset
      color: inherit;
      text-decoration: none;

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

  &_icon {
    width: 100%;
    height: 100%;
  }
}
</style>
