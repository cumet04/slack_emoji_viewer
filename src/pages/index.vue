<template>
  <main>
    <div class="toolbar">
      <filter-input v-model="keyword" class="filter"></filter-input>
      <button class="reload" @click="reloadEmojis">
        <img src="/src/assets/images/ico-reload.svg" alt="" />
      </button>
    </div>
    <ul class="list">
      <li
        v-for="emoji in all"
        :key="emoji.name"
        v-show="isMatched(emoji)"
        class="emoji"
      >
        <emoji :emoji="emoji" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { fetchStore } from "../store";
import { Emoji } from "../store/emojis";
import EmojiComponent from "../components/Emoji.vue";
import FilterInputComponent from "../components/FilterInput.vue";

export default defineComponent({
  components: {
    emoji: EmojiComponent,
    "filter-input": FilterInputComponent,
  },
  setup() {
    const store = fetchStore();

    const keyword = ref("");
    const all = computed(() => store.emoji.orderByName());
    const reloadEmojis = () => {
      const { domain, token } = store.workspace.current();
      store.emoji.fetchAll(domain, token);
    };
    const isMatched = (emoji: Emoji) => {
      const names = [emoji.name, ...emoji.aliases?.map((e) => e.name)];
      return names.some((name) => name.includes(keyword.value));
    };
    return {
      keyword,
      all,
      reloadEmojis,
      isMatched,
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

.list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  margin: 2px;
}
</style>
