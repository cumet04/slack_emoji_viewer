<template>
  <div class="filter">
    <input
      type="text"
      :value="value"
      class="input"
      placeholder="Filter"
      @input="$emit('input', $event.target.value)"
    />
    <div class="clear" @click="$emit('input', '')"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
  },
});
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
  border: solid 1px lightgray;
  padding-left: 4px;
  font-size: 1.4rem;
}

.clear {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 0px;
  right: 0px;

  &::after {
    position: absolute;
    top: 0px;
    left: 6px;
    color: gray;
    content: "×";
  }
}
</style>
