<template>
  <div>
    <div class="board" :class="{ hidden: hidden }">
      <label for="clipboard">stock</label>
      <input ref="input" type="text" name="clipboard" class="input" />
      <button class="clear" @click="clear">
        <span class="cross_bar"></span>
        <span class="cross_bar"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { fetchStore } from "../store";

export default defineComponent({
  setup() {
    const store = fetchStore();

    const input = ref({} as HTMLInputElement);
    const stock = computed(() => store.stock.all());
    const hidden = computed(() => stock.value.length == 0);
    const clear = () => store.stock.clear();

    watch(
      () => stock,
      () => {
        // 確実にinput要素のvalueが変更したあとにselect -> execする必要があるため
        // v-bindなどは使わずにDOM操作でvalue変更を行う
        const text = stock.value.map((e) => `:${e.name}:`).join("");
        const node = input.value;
        node.value = text;

        node.select();
        document.execCommand("copy");
        node.blur();
      }
    );
    return {
      input,
      stock,
      hidden,
      clear,
    };
  },
});
</script>

<style scoped lang="postcss">
.board {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: bisque;

  --height: 30px;
  position: absolute;
  bottom: 0;
  height: var(--height);
  transition: bottom 0.2s;

  &.hidden {
    bottom: calc(-1 * var(--height));
    transition: bottom 0.5s 0.1s;
  }
}

.input {
  flex-grow: 1;
  background-color: white;
  border: solid 1px lightgray;
}

.clear {
  flex-basis: 25px;
  height: 25px;
  position: relative;
  border: none;
  background: none;
}

.cross_bar {
  display: block;
  position: absolute;
  top: 4px;
  left: 12px;
  width: 0;
  height: 15px;
  border: solid 1px gray;
  background-color: gray;
  transform: rotate(45deg);

  &:first-child {
    transform: rotate(-45deg);
  }
}
</style>
