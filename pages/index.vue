<template>
  <main>
    <input type="text" v-model="keyword" placeholder="Filter" />
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
  mounted() {
    this.$store.dispatch("emoji/fetch_all");
  },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    all() {
      return this.$store.getters["emoji/all"];
    }
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
