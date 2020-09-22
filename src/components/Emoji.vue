<template>
  <img
    :src="emoji.image"
    :title="displayName"
    width="32"
    height="32"
    loading="lazy"
    class="img"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

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
    return {
      displayName: computed(() => {
        const names = [
          props.emoji.name,
          ...props.emoji.aliases?.map((e) => e.name),
        ];
        return names.map((name) => `:${name}:`).join(" ");
      }),
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
