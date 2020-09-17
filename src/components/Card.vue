<template>
  <section class="card-component">
    <slot></slot>
  </section>
</template>

<style lang="postcss" scoped>
.card-component {
  background-color: var(--color-panel);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  padding: 16px;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
}
</style>
