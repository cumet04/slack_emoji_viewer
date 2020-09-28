<template>
  <card>
    <search-input
      v-model:value="keyword"
      placeholder="Search emoji"
    ></search-input>
    <ul class="users">
      <li v-for="{ user, emojis } in alls" :key="user.name" class="user">
        <user-message
          v-show="shows[user.name]"
          :user-name="user.name"
          :user-icon="user.image"
          :date="user.date"
        >
          <ul class="list">
            <li
              v-for="emoji in emojis"
              v-show="shows[user.name] && shows[user.name][emoji.name]"
              :key="emoji.name"
              class="emoji"
            >
              <emoji :emoji="emoji" :name="emoji.name"></emoji>
            </li>
          </ul>
        </user-message>
      </li>
    </ul>
  </card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Card from "../../components/Card.vue";
import Emoji from "../../components/Emoji.vue";
import SearchInput from "../../components/SearchInput.vue";
import UserMessage from "../../components/UserMessage.vue";
import { useStore } from "../../store";

export default defineComponent({
  components: {
    card: Card,
    emoji: Emoji,
    "search-input": SearchInput,
    "user-message": UserMessage,
  },
  setup() {
    const store = useStore();

    const alls = computed(() => {
      const emojis = store.emoji.forUser([]);
      return Object.keys(emojis).map((user) => ({
        user: {
          name: emojis[user].slice(-1)[0].userName,
          image: emojis[user].slice(-1)[0].userImage,
          date: emojis[user].slice(-1)[0].created,
        },
        emojis: emojis[user],
      }));
    });

    // { [key: username]: { [key: emoji-name]: boolean } }
    const shows = computed(() => {
      // query-type is omitted -> add @ prefix
      const queries = keyword.value
        .split(" ")
        .map((q) => (!q.startsWith("@") && !q.startsWith(":") ? `@${q}` : q));
      let map = {} as { [key: string]: { [key: string]: boolean } };
      const emojis = store.emoji.forUser(queries);
      Object.keys(emojis).forEach((user) => {
        if (emojis[user].length == 0) return;
        map[user] = {};
        emojis[user].forEach((e) => {
          map[user][e.name] = true;
        });
      });
      return map;
    });

    const keyword = ref("");
    return {
      keyword,
      alls,
      shows,
    };
  },
});
</script>

<style lang="postcss" scoped>
.user {
  margin: 8px;

  &:first-of-type {
    margin-top: 16px;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
  margin-top: -8px;
}

.emoji {
  margin: 8px 0 0 4px;
}
</style>
