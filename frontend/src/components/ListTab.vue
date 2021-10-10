<template>
  <nav class="list-tab">
    <router-link to="/all" class="link" :class="isAll && 'current'">
      <mdi-icon :path="mdiFileTableBoxOutline" />
      <div class="label">no group</div>
    </router-link>
    <router-link to="/daily" class="link" :class="isDaily && 'current'">
      <mdi-icon :path="mdiCalendarToday" />
      <div class="label">by date</div>
    </router-link>
    <router-link to="/user" class="link" :class="isUser && 'current'">
      <mdi-icon :path="mdiAccount" />
      <div class="label">by user</div>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mdiAccount, mdiCalendarToday, mdiFileTableBoxOutline } from "@mdi/js";

type ListType = "all" | "daily" | "user";
type Props = {
  listType: ListType;
};

export default defineComponent({
  props: {
    listType: {
      type: String as PropType<ListType>,
      required: true,
    },
  },
  setup(props: Props) {
    return {
      isAll: props.listType == "all",
      isDaily: props.listType == "daily",
      isUser: props.listType == "user",

      mdiAccount,
      mdiCalendarToday,
      mdiFileTableBoxOutline,
    };
  },
});
</script>

<style lang="postcss" scoped>
.list-tab {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  & .link {
    display: flex;
    height: 30px;
    padding: 0 8px;
    margin-left: 8px;
    font-size: 1.4rem;

    & .label {
      margin-left: 8px;
    }

    &:hover {
      text-decoration: none;
    }

    &.current {
      cursor: inherit;
      color: var(--color-primary);
      border-bottom: solid 1px var(--color-primary);
    }
  }
}
</style>
