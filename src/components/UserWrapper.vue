<template>
  <div class="wrapper">
    <div class="icon">
      <img :src="emoji.userImage" class="img" />
    </div>
    <div>
      <h1 class="name">{{ emoji.userName }}</h1>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Emoji } from "../store/emojis";

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
  setup() {},
});
</script>

<style scoped lang="postcss">
.wrapper {
  display: flex;
  flex-direction: row;
}

.icon {
  width: 44px;
  flex-shrink: 0;

  & .img {
    width: 36px;
    height: 36px;
    border-radius: 3px;
  }
}

.name {
  font-size: 15px;
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: 6px;
}
</style>
