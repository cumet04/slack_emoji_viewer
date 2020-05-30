<template>
  <div class="filter">
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      placeholder="Filter"
      class="input"
    />
    <div class="clear" @click="$emit('input', '')"></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped lang="postcss">
.filter {
  position: relative;
  display: flex;
  width: 240px;
  height: 24px;
}

.input {
  display: block;
  width: 100%;
  padding-left: 4px;
}

.clear {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 0px;
  right: 0px;

  &::after {
    position: absolute;
    top: 4px;
    left: 6px;
    color: gray;
    content: "×";
  }
}
</style>
