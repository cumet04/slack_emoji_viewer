<template>
  <main>
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
  computed: {
    by_author: function() {
      const src = [].concat(this.$store.state.emoji.all);
      return src
        .filter(a => a.is_alias == 0)
        .sort((a, b) => {
          return a.created - b.created;
        })
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
  list-style-type: none;
  padding: auto;
  margin: 2px;
}
</style>
