<template>
  <div class="wrapper">
    <div class="icon">
      <img :src="user_image" class="icon_img" />
    </div>
    <div>
      <h1 class="name">{{ emoji.user_display_name }}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["emoji"],
  computed: {
    user_image() {
      const base = "https://ca.slack-edge.com";
      const size = 48;
      return `${base}/${this.emoji.team_id}-${this.emoji.user_id}-${this.emoji.avatar_hash}-${size}`;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
}

.icon {
  width: 44px;
  margin-right: auto;

  &_img {
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
