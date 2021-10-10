<template>
  <search-input v-model:value="keyword" placeholder="Search emoji" />
  <ul ref="listRef" class="list">
    <li v-for="emoji in emojis" :key="emoji.name" class="emoji">
      <emoji :emoji="emoji" :name="emoji.name" />
    </li>
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  SetupContext,
  watch,
} from "vue";
import SearchInput from "../../components/SearchInput.vue";
import Emoji from "../../components/Emoji.vue";
import { useStore } from "../../store";

type Props = {
  maxRows: number;
  trimmed: boolean;
};

export default defineComponent({
  components: {
    emoji: Emoji,
    "search-input": SearchInput,
  },
  props: {
    maxRows: {
      type: Number,
      default: 10,
    },
    trimmed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:trimmed", "changed"],
  setup(props: Props, ctx: SetupContext) {
    const store = useStore();

    const keyword = ref("");
    watch(keyword, () => ctx.emit("changed"));

    const listWidth = ref(0);
    const listRef = ref<HTMLUListElement>();
    onMounted(() => {
      window.addEventListener("resize", () => {
        listWidth.value = listRef.value?.clientWidth || 0;
      });
      if (listRef.value) {
        listWidth.value = listRef.value.clientWidth;
      }
    });

    const emojis = computed(() => {
      // query-type is omitted -> add colon prefix
      const queries = keyword.value
        .split(" ")
        .map((q) => (!q.startsWith("@") && !q.startsWith(":") ? `:${q}` : q));

      const xCount = Math.floor(listWidth.value / 36); // 36: li.emoji width including margin
      const all = store.emoji.forAll(queries);
      const sliced = all.slice(0, xCount * props.maxRows);
      ctx.emit("update:trimmed", all.length > sliced.length);
      return sliced;
    });

    return {
      keyword,
      listRef,
      emojis,
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
