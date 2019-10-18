<template>
  <div id="root">
    <the-sidebar id="nav" />
    <nuxt id="main" />
    <the-board id="board" />
  </div>
</template>

<script>
import TheSidebar from '~/components/TheSidebar.vue'
import TheBoard from '~/components/TheBoard.vue'

export default {
  components: {
    'the-sidebar': TheSidebar,
    'the-board': TheBoard
  }
}
</script>

<style scoped lang="scss">
#root {
  display: flex;
  position: relative;
  flex-direction: row;
}

#nav {
  display: block;
  width: 200px;
}

#board {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
