<template>
  <aside>
    <h1 class="header">menu</h1>
    <ul>
      <li v-for="menu in menus" :key="menu.name" class="menu_item">
        <nuxt-link :to="menu.url">{{ menu.name }}</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "top", url: "/" },
        { name: "by author", url: "/author" },
        { name: "settings", url: "/settings" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  font-size: 20px;
  margin-bottom: 16px;
}

.menu_item {
  margin-bottom: 4px;
}
</style>
