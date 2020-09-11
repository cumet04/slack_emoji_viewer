<template>
  <main>
    <div class="toolbar">
      <filter-input v-model:value="keyword" class="filter"></filter-input>
      <button class="reload" @click="reloadEmojis">
        <img src="/src/assets/images/ico-reload.svg" alt="" />
      </button>
    </div>
    <section v-for="(emojis, author) in byAuthor" :key="author" class="user">
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

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { fetchStore } from "../store";
import { reloadEmojis } from "../services/emoji";
import UserWrapperComponent from "../components/UserWrapper.vue";
import EmojiComponent from "../components/Emoji.vue";
import FilterInputComponent from "../components/FilterInput.vue";

export default defineComponent({
  components: {
    emoji: EmojiComponent,
    "filter-input": FilterInputComponent,
    "user-wrapper": UserWrapperComponent,
  },
  setup() {
    const store = fetchStore();

    const keyword = ref("");
    const byAuthor = computed(() => {
      const filtered = {} as { [k: string]: Emoji[] };
      const all = store.emoji.byAuthor();
      for (let user in all) {
        const userEmojis = all[user].filter((e) => {
          const names = [e.name, ...e.aliases?.map((e) => e.name)];
          return names.some((name) => name.includes(keyword.value));
        });
        if (userEmojis.length > 0) filtered[user] = userEmojis;
      }
      return filtered;
    });

    return {
      keyword,
      byAuthor,
      reloadEmojis: () => reloadEmojis(store),
    };
  },
});
</script>

<style scoped lang="postcss">
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  & .reload {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
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
