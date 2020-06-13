<template>
  <img
    :src="emoji.image"
    :title="displayName"
    width="32"
    height="32"
    loading="lazy"
    class="img"
    @click="select"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
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
    return {
      displayName: computed(() => {
        const names = [
          props.emoji.name,
          ...props.emoji.aliases?.map((e) => e.name),
        ];
        return names.map((name) => `:${name}:`).join(" ");
      }),
      select() {
        store.emoji.pushStock(props.emoji);
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
