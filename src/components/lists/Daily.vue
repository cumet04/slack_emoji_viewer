<template>
  <ul ref="daysRef" class="days">
    <li v-for="{ date, emojis } in emojis" :key="date" class="day">
      <user-message
        :user-name="formatDate(date)"
        :mdi-icon="mdiIcon(date)"
        :icon-color="mdiColor(date)"
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
import { computed, defineComponent, onMounted, ref, SetupContext } from "vue";
import Emoji from "../../components/Emoji.vue";
import UserMessage from "../../components/UserMessage.vue";
import { mdiNewBox, mdiCalendarToday } from "@mdi/js";
import { useStore } from "../../store";
import { formatDate, last, trimUserEmojis } from "../../utils";

type Props = {
  maxHeight: number;
  trimmed: boolean;
};

export default defineComponent({
  components: {
    emoji: Emoji,
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
  emits: ["update:trimmed"],
  setup(props: Props, ctx: SetupContext) {
    const store = useStore();

    const daysWidth = ref(0);
    const daysRef = ref<HTMLUListElement>();
    onMounted(() => {
      window.addEventListener("resize", () => {
        daysWidth.value = daysRef.value?.clientWidth || 0;
      });
      if (daysRef.value) {
        daysWidth.value = daysRef.value.clientWidth;
      }
    });

    const emojis = computed(() => {
      const all = store.emoji.forDaily();
      if (all.length == 0) return [];

      const sliced = trimUserEmojis(all, daysWidth.value, props.maxHeight);
      ctx.emit(
        "update:trimmed",
        all.length > sliced.length ||
          last(all).emojis.length > last(sliced).emojis.length
      );
      return sliced;
    });

    const isRecent = (date: Date) =>
      ["today", "yesterday"].includes(formatDate(date));
    const mdiIcon = (date: Date) =>
      isRecent(date) ? mdiNewBox : mdiCalendarToday;
    const mdiColor = (date: Date) =>
      isRecent(date) ? "var(--color-info)" : "";

    return {
      daysRef,

      emojis,
      formatDate,
      mdiIcon,
      mdiColor,
    };
  },
});
</script>

<style lang="postcss" scoped>
.day:not(:first-of-type) {
  margin-top: 16px;
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
