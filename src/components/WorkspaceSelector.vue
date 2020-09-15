<template>
  <div class="workspace-selector">
    <button v-if="!current" class="button anonymous" @click="anonymousEvent">
      <account-alert-icon size="34px"></account-alert-icon>
    </button>
    <template v-else>
      <button class="button" @click="open = !open">
        <img :src="current.icon.image_44" :alt="current.name" class="icon" />
      </button>
      <div v-if="open" class="menu">
        <ol>
          <li class="item current" @click="open = false">
            <img class="icon" :src="current.icon.image_34" />
            <div class="name">
              {{ current.name }}
            </div>
            <check-circle-outline-icon
              class="check"
            ></check-circle-outline-icon>
          </li>
          <li
            v-for="ws in list"
            :key="ws.domain"
            class="item"
            @click="select(ws.domain)"
          >
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
import CheckCircleOutlineIcon from "../components/icons/CheckCircleOutlineIcon.vue";
import AccountAlertIcon from "../components/icons/AccountAlertIcon.vue";

export default defineComponent({
  components: {
    "check-circle-outline-icon": CheckCircleOutlineIcon,
    "account-alert-icon": AccountAlertIcon,
  },
  setup() {
    const open = ref(false);

    const store = useStore();
    const current = computed(() => store.workspace.current());
    const list = computed(() =>
      store.workspace.all().filter((ws) => ws != current.value)
    );
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
  right: 0;
  min-width: 180px;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.16);
  background-color: white;
  border-radius: 4px;
}

.item {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  padding: 8px 16px;

  &:hover:not(.current) {
    background-color: #eee;
  }

  & .icon {
    margin-right: 8px;
  }

  & .check {
    color: #4caf50;
    padding-left: 16px;
    margin-left: auto;
  }
}
</style>
