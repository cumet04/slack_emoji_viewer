<template>
  <div class="load">
    <button class="button">load more</button>
  </div>
</template>

<style scoped lang="postcss">
.load {
  margin-top: 16px;

  & .button {
    margin: 0 auto;
    width: 100px;
    height: 32px;
    border-radius: 16px;

    font-size: 1.4rem;
    color: var(--color-text-label);
    background-color: var(--color-primary);
  }
}
</style>
