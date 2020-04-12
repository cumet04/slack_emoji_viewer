<template>
  <aside class="nav">
    <h1 class="header">menu</h1>
    <ul class="menu">
      <li v-for="menu in menus" :key="menu.name" class="menu_item">
        <nuxt-link :to="menu.url">{{ menu.name }}</nuxt-link>
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
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-right: lightgray solid 1px;
}

.header {
  font-size: 20px;
  margin-bottom: 16px;
}

.menu {
  flex-grow: 1;
  &_item {
    margin-bottom: 4px;
  }
}

.footer {
  display: flex;
  justify-content: center;
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
