<template>
  <img
    :src="emoji.image"
    :title="title"
    width="32"
    height="32"
    loading="lazy"
    class="img"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
    const names = [
      props.emoji.name,
      ...props.emoji.aliases?.map((e) => e.name),
    ].map((n) => `:${n}:`);
    const title = `${names.join(" ")}\nby ${props.emoji.userName}`;
    return {
      title,
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
