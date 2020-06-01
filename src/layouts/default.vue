<template>
  <div id="root">
    <the-sidebar id="nav" />
    <nuxt id="main" />
    <the-board id="board" />
  </div>
</template>

<script>
import TheSidebar from "~/components/TheSidebar.vue";
import TheBoard from "~/components/TheBoard.vue";

export default {
  components: {
    "the-sidebar": TheSidebar,
    "the-board": TheBoard,
  },
};
</script>

<style scoped lang="postcss">
#root {
  display: flex;
  position: relative;
  flex-direction: row;
}

#nav {
  position: sticky;
  top: 0;
  width: 200px;
  height: 100vh;
}

#main {
  width: 768px;
  padding: 24px;
}

#board {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
