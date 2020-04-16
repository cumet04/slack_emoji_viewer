<template>
  <main>
    <div class="toolbar">
      <filter-input v-model="keyword" class="filter"></filter-input>
      <button class="toolbar_reload" @click="reloadEmojis">
        <img src="~/assets/images/ico-reload.svg" alt="" />
      </button>
    </div>
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
import FilterInput from "~/components/FilterInput.vue";
import EmojiService from "~/services/emojiService";

export default {
  components: {
    emoji: Emoji,
    "filter-input": FilterInput,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    all() {
      return this.$store.getters["emoji/orderByName"];
    },
  },
  methods: {
    reloadEmojis() {
      this.$store.commit("emoji/clear");
      new EmojiService(this.$store).fetchAll();
    },
  },
};
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  &_reload {
    // reset
    border: none;
    padding: 0;
    background: none;
    line-height: 1;

    cursor: pointer;
    width: 18px;
    height: 18px;
  }
}

main {
  width: 720px;
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  margin: 2px;
}
</style>
