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
      return `:${this.emoji.name}:`;
    },
  },
  methods: {
    select(event) {
      const name = event.currentTarget.getAttribute("title");
      this.$store.commit("stock/push", name);
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
