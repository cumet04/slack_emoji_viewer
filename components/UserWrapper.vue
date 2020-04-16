<template>
  <div class="wrapper">
    <div class="icon">
      <img :src="emoji.userImage" class="icon_img" />
    </div>
    <div>
      <h1 class="name">{{ emoji.userName }}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["emoji"],
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
}

.icon {
  width: 44px;
  flex-shrink: 0;

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
