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
export default {
  props: ["emoji"],
  computed: {
    display_name() {
      return [this.emoji.name, ...this.emoji.aliases?.map((e) => e.name)]
        .map((name) => `:${name}:`)
        .join(" ");
    },
  },
  methods: {
    select(event) {
      this.$store.commit("stock/push", `:${this.emoji.name}:`);
    },
  },
};
</script>

<style scoped lang="scss">
.img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
