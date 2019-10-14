<template>
  <aside>
    <h1>menu</h1>
    <ul>
      <li v-for="menu in menus" :key="menu.name">
        <nuxt-link :to="menu.url">{{ menu.name }}</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      menus: [{ name: 'top', url: '/' }, { name: 'by author', url: '/author' }]
    }
  }
}
</script>

<style lang="scss">
</style>
