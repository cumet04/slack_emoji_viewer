<template>
  <main>
    <div class="toolbar">
      <filter-input v-model="keyword" class="filter"></filter-input>
      <button class="toolbar_reload" @click="reloadEmojis">
        <img src="~/assets/images/ico-reload.svg" alt="" />
      </button>
    </div>
    <section v-for="(emojis, author) in by_author" :key="author" class="user">
      <user-wrapper :emoji="emojis[0]">
        <ul class="list">
          <li v-for="emoji in emojis" :key="emoji.name" class="emoji">
            <emoji :emoji="emoji" />
          </li>
        </ul>
      </user-wrapper>
    </section>
  </main>
</template>

<script>
import UserWrapper from "~/components/UserWrapper.vue";
import FilterInput from "~/components/FilterInput.vue";
import Emoji from "~/components/Emoji.vue";
import EmojiService from "~/services/emojiService";

const groupBy = (source, getkey) =>
  source.reduce((map, item) => {
    const key = getkey(item);
    (map[key] || (map[key] = [])).push(item);
    return map;
  }, {});

export default {
  components: {
    "user-wrapper": UserWrapper,
    "filter-input": FilterInput,
    emoji: Emoji,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    filtered() {
      return this.$store.getters["emoji/latest_sorted"].filter((e) =>
        e.name.includes(this.keyword)
      );
    },
    by_author() {
      return groupBy(
        this.filtered.filter((a) => a.is_alias == 0),
        (emoji) => emoji.user_display_name
      );
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
  width: 728px;
}

.user {
  margin-bottom: 12px;
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  margin: 2px;
}
</style>
