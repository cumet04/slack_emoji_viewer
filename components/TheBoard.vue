<template>
  <div>
    <div class="board" :class="{ hidden: hidden }">
      <label for="clipboard">stock</label>
      <input type="text" name="clipboard" class="board_input" />
      <button class="board_clear" @click="clear">
        <span class="board_clear_bar"></span>
        <span class="board_clear_bar"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hidden() {
      return this.stock.length == 0;
    }
  },
  methods: {
    clear() {
      this.$store.commit("emoji/clear_stock");
    }
  },
  data() {
    return {
      stock: this.$store.state.emoji.stock
    };
  },
  watch: {
    stock(value) {
      // 確実にinput要素のvalueが変更したあとにselect -> execする必要があるため
      // v-bindなどは使わずにDOM操作でvalue変更を行う
      const text = this.stock.join("");
      const node = this.$el.getElementsByClassName("board_input")[0];
      node.value = text;

      node.select();
      document.execCommand("copy");
      node.blur();
    }
  }
};
</script>

<style lang="scss">
.board {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: bisque;

  $height: 30px;
  position: absolute;
  bottom: 0;
  height: $height;
  transition: bottom 0.2s;

  &.hidden {
    bottom: -$height;
    transition: bottom 0.5s 0.1s;
  }

  &_input {
    flex-grow: 1;
  }

  &_clear {
    flex-basis: 25px;
    height: 25px;
    position: relative;
    border: none;
    background: none;

    &_bar {
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
  }
}
</style>
