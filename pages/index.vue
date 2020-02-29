<template>
  <main>
    <input type="text" v-model="keyword" placeholder="Search" />
    <ul class="list">
      <li
        v-for="emoji in all"
        :key="emoji.name"
        v-show="emoji.name.includes(keyword)"
        class="emoji"
      >
        <emoji :emoji="emoji" />
      </li>
    </ul>
  </main>
</template>

<script>
import Emoji from "~/components/Emoji.vue";

export default {
  components: {
    emoji: Emoji
  },
  data() {
    return {
      all: this.$store.getters["emoji/all"],
      keyword: ""
    };
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}

.emoji {
  margin: 2px;
}
</style>
