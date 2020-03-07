<template>
  <main>
    <input type="text" v-model="keyword" placeholder="Filter" />
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
import Emoji from "~/components/Emoji.vue";

export default {
  components: {
    "user-wrapper": UserWrapper,
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
    filtered() {
      return this.$store.getters["emoji/latest_sorted"].filter(e =>
        e.name.includes(this.keyword)
      );
    },
    by_author() {
      return this.filtered
        .filter(a => a.is_alias == 0)
        .reduce((map, emoji) => {
          const key = emoji.user_display_name;
          if (!(key in map)) map[key] = [];
          map[key].push(emoji);
          return map;
        }, {});
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 8px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}

.emoji {
  margin: 2px;
}
</style>
