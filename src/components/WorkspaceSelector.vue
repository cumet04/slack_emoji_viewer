<template>
  <div class="workspace-selector">
    <button v-if="!current" class="button anonymous" @click="anonymousEvent">
      <mdi-icon :path="mdiAccountAlert" size="34px"></mdi-icon>
    </button>
    <template v-else>
      <button class="button" @click="open = !open">
        <img :src="current.icon.image_44" :alt="current.name" class="icon" />
      </button>
      <div v-if="open" class="menu">
        <ol>
          <li
            v-for="ws in list"
            :key="ws.domain"
            class="item"
            :class="ws == current && 'current'"
            @click="select(ws.domain)"
          >
            <mdi-icon
              v-if="ws == current"
              :path="mdiCheckCircleOutline"
              class="check"
            ></mdi-icon>
            <img class="icon" :src="ws.icon.image_34" />
            <div class="name">{{ ws.name }}</div>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { mdiCheckCircleOutline, mdiAccountAlert } from "@mdi/js";

export default defineComponent({
  setup() {
    const open = ref(false);

    const store = useStore();
    const current = computed(() => store.workspace.current());
    const list = computed(() => store.workspace.display());
    const select = (domain: string) => {
      store.workspace.setCurrent(domain);
      open.value = false;
    };

    const router = useRouter();
    const anonymousEvent = () => {
      alert("Add workspace to use the app.");
      router.push({ name: "preferences" });
    };

    return {
      current,
      list,
      select,
      open,
      anonymousEvent,

      mdiCheckCircleOutline,
      mdiAccountAlert,
    };
  },
});
</script>

<style lang="postcss" scoped>
.workspace-selector {
  position: relative;
}

.button {
  width: 44px;
  height: 44px;

  &.anonymous {
    color: gray;
  }
}

.menu {
  position: absolute;
  padding: 4px 0;
  right: 0;
  min-width: 180px;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.16);
  background-color: var(--color-panel);
  border: solid 1px var(--color-border);
  border-radius: 4px;
}

.item {
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 8px;
  border-radius: 4px;
  white-space: nowrap;

  &:hover:not(.current) {
    background-color: var(--color-background);
  }

  & .check {
    color: var(--color-success);
    position: absolute;
  }

  & .name {
    margin-left: 8px;
  }

  & .icon {
    margin-left: 32px;
  }
}
</style>
