<template>
  <img
    :src="emoji.image"
    :title="displayName"
    width="32"
    height="32"
    @click="select"
    loading="lazy"
    class="img"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Emoji } from "../store/emojis";
import { fetchStore } from "../store";

type Props = {
  emoji: Emoji;
};

export default defineComponent({
  props: {
    emoji: {
      type: Object as PropType<Emoji>,
      required: true,
    },
  },
  setup(props: Props) {
    const store = fetchStore();
    const emoji = props.emoji;
    return {
      emoji,
      displayName: computed(() => {
        const names = [emoji.name, ...emoji.aliases?.map((e) => e.name)];
        return names.map((name) => `:${name}:`).join(" ");
      }),
      select() {
        store.emoji.pushStock(emoji);
      },
    };
  },
});
</script>

<style scoped lang="postcss">
.img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
