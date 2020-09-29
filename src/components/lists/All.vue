<template>
  <search-input
    v-model:value="keyword"
    placeholder="Search emoji"
  ></search-input>
  <ul class="list">
    <li
      v-for="emoji in all"
      v-show="shows[emoji.name]"
      :key="emoji.name"
      class="emoji"
    >
      <emoji :emoji="emoji" :name="emoji.name"></emoji>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import SearchInput from "../../components/SearchInput.vue";
import Emoji from "../../components/Emoji.vue";
import { useStore } from "../../store";

export default defineComponent({
  components: {
    emoji: Emoji,
    "search-input": SearchInput,
  },
  setup() {
    const store = useStore();

    const keyword = ref("");

    // TODO: something such as virtual scrolling

    // hack for performance: using v-show
    // This can use DOM instance cache when emojis reappear by deleting keyword
    const all = computed(() => store.emoji.forAll([]));
    const shows = computed(() => {
      // query-type is omitted -> add colon prefix
      const queries = keyword.value
        .split(" ")
        .map((q) => (!q.startsWith("@") && !q.startsWith(":") ? `:${q}` : q));
      let map = {} as { [key: string]: boolean };
      store.emoji.forAll(queries).forEach((e) => {
        map[e.name] = true;
      });
      return map;
    });

    return {
      keyword,
      all,
      shows,
    };
  },
});
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.emoji {
  margin: 8px 0 0 4px;
}
</style>
