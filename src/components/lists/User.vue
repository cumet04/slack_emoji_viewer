<template>
  <search-input
    v-model:value="keyword"
    placeholder="Search user"
  ></search-input>
  <ul ref="usersRef" class="users">
    <li v-for="{ user, emojis } in emojis" :key="user.name" class="user">
      <user-message
        :user-name="user.name"
        :user-icon="user.image"
        :date="user.date"
      >
        <ul class="list">
          <li v-for="emoji in emojis" :key="emoji.name" class="emoji">
            <emoji :emoji="emoji" :name="emoji.name"></emoji>
          </li>
        </ul>
      </user-message>
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
import Emoji from "../../components/Emoji.vue";
import SearchInput from "../../components/SearchInput.vue";
import UserMessage from "../../components/UserMessage.vue";
import { useStore } from "../../store";
import { last, trimUserEmojis } from "../../utils";

type Props = {
  maxHeight: number;
  trimmed: boolean;
};

export default defineComponent({
  components: {
    emoji: Emoji,
    "search-input": SearchInput,
    "user-message": UserMessage,
  },
  props: {
    maxHeight: {
      type: Number,
      default: 300,
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

    const usersWidth = ref(0);
    const usersRef = ref<HTMLUListElement>();
    onMounted(() => {
      window.addEventListener("resize", () => {
        usersWidth.value = usersRef.value?.clientWidth || 0;
      });
      if (usersRef.value) {
        usersWidth.value = usersRef.value.clientWidth;
      }
    });

    const emojis = computed(() => {
      // query-type is omitted -> add @ prefix
      const queries = keyword.value
        .split(" ")
        .map((q) => (!q.startsWith("@") && !q.startsWith(":") ? `@${q}` : q));

      const raw = store.emoji.forUser(queries);
      const all = Object.keys(raw).map((user) => ({
        user: {
          name: last(raw[user]).userName,
          image: last(raw[user]).userImage,
          date: last(raw[user]).created,
        },
        emojis: raw[user],
      }));
      if (all.length == 0) return [];

      const sliced = trimUserEmojis(all, usersWidth.value, props.maxHeight);
      ctx.emit(
        "update:trimmed",
        all.length > sliced.length ||
          last(all).emojis.length > last(sliced).emojis.length
      );
      return sliced;
    });

    return {
      keyword,
      usersRef,
      emojis,
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
