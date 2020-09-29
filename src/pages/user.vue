<template>
  <main class="inner">
    <list-tab list-type="user"></list-tab>
    <card>
      <page></page>
    </card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import ListTab from "../components/ListTab.vue";
import User from "../components/lists/User.vue";

export default defineComponent({
  components: {
    card: Card,
    "list-tab": ListTab,
    page: User,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="postcss">
</style>
