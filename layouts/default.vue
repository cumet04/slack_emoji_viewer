<template>
  <div id="root">
    <sidenav id="root_nav" />
    <nuxt id="root_main" />
    <board id="root_board" />
  </div>
</template>

<script>
import sidenav from '~/components/sidenav.vue'
import board from '~/components/board.vue'

export default {
  components: {
    sidenav,
    board
  }
}
</script>

<style  lang="scss">
#root {
  display: flex;
  position: relative;
  flex-direction: row;

  &_nav {
    display: block;
    width: 200px;
  }

  &_board {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}
</style>
