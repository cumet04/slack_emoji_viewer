<template>
  <img
    :src="emoji.image"
    :title="display_name"
    @click="select"
    loading="lazy"
    class="img"
  />
</template>

<script>
import Emojis from "../store/emojis";

export default {
  props: ["emoji"],
  computed: {
    display_name() {
      const names = this.emoji.aliases
        ? [this.emoji.name, ...this.emoji.aliases.map((e) => e.name)]
        : [this.emoji.name];
      return names.map((name) => `:${name}:`).join(" ");
    },
  },
  methods: {
    select(event) {
      Emojis.pushStock(this.emoji);
    },
  },
};
</script>

<style scoped lang="postcss">
.img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
