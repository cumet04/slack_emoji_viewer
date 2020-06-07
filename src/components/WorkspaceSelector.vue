<template>
  <div class="container" @click="open = !open">
    <div class="workspace current">
      <template v-if="current">
        <img class="icon" :src="current.icon.image_34" />
        <div class="name">{{ current.name }}</div>
      </template>
      <template v-else>
        <div class="anonymous">(no workspace set)</div>
      </template>
    </div>
    <div class="selector" v-if="open">
      <ol>
        <li
          class="item workspace"
          @click="select(ws.domain)"
          v-for="ws in list"
          :key="ws.domain"
        >
          <img class="icon" :src="ws.icon.image_34" />
          <div class="name">{{ ws.name }}</div>
        </li>
      </ol>
      <router-link to="/settings#add_workspace" class="item add">
        <div class="add_text">add workspace...</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { fetchStore } from "../store";

export default defineComponent({
  setup() {
    const store = fetchStore();
    const current = computed(() => store.workspace.current());
    const list = computed(() =>
      store.workspace.all().filter((ws) => ws != current.value)
    );
    const select = (domain: string) => {
      store.workspace.setCurrent(domain);
      const { token } = store.workspace.current();
      store.emoji.fetchAll(domain, token);
    };
    return {
      open: ref(false),
      current,
      list,
      select,
    };
  },
});
</script>

<style scoped lang="postcss">
.container {
  position: relative;
  margin: 8px;
}

.current {
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 12px;
    right: 2px;

    width: 6px;
    height: 6px;
    border: black solid 0;
    border-right-width: 1px;
    border-bottom-width: 1px;
    transform: rotate(45deg);
  }
}

.workspace {
  display: flex;
  align-items: center;

  & .icon {
    margin-right: 4px;
    height: 34px;
  }

  & .name {
    font-size: 18px;
  }

  & .anonymous {
    font-size: 14px;
    color: gray;
    padding-left: 14px;
  }
}

.selector {
  position: absolute;
  width: 100%;
  border: gray solid 1px;
  border-radius: 3px;
  background: white;
  margin-top: 2px;

  & .item {
    padding: 4px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }

    &.add {
      display: block;
      padding: 8px;
    }
  }
}
</style>
