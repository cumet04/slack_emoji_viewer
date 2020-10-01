<template>
  <input
    type="text"
    :value="value"
    :placeholder="placeholder"
    class="text-input-component"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: "",
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
.text-input-component {
  background-color: var(--color-panel);
  border: solid 1px var(--color-gray);
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
