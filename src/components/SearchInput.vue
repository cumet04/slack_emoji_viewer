<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="value"
    class="search-input-component"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
});
</script>

<style lang="postcss" scoped>
.search-input-component {
  display: block;
  width: 100%;
  height: 24px;
  padding: 0 8px;

  color: var(--color-text-primary);
  background-color: var(--color-panel);
  font-size: 1.2rem;

  border: solid 1px var(--color-gray);
  border-radius: 4px;

  &::placeholder {
    color: var(--color-gray);
  }
}
</style>
