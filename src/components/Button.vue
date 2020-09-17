<template>
  <button class="button-component" :class="style">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  danger: boolean;
};

export default defineComponent({
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    const style = props.danger ? "danger" : "submit";
    return {
      style,
    };
  },
});
</script>

<style lang="postcss" scoped>
.button-component {
  color: var(--color-text-label);
  border-radius: 4px;
  padding: 8px 16px;

  &.submit {
    background-color: var(--color-primary);
  }
  &.danger {
    background-color: var(--color-danger);
  }
}
</style>
