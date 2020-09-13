<template>
  <div>
    <svg
      style="display: block"
      fill="currentColor"
      viewBox="0 0 24 24"
      :width="size"
      :height="size"
    >
      <path :d="path" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    path: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "24px",
    },
  },
});
</script>
