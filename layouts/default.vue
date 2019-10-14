<template>
  <div id="root">
    <sidenav id="root_nav" />
    <nuxt id="root_main" />
  </div>
</template>

<script>
import sidenav from '~/components/sidenav.vue'

export default {
  components: {
    sidenav
  }
}
</script>

<style  lang="scss">
#root {
  display: flex;
  flex-direction: row;

  &_nav {
    display: block;
    width: 200px;
  }
}
</style>
