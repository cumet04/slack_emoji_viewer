<template>
  <main class="inner">
    <nav class="nav">
      <router-link to="/all" class="link" :class="isAll && 'current'">
        <mdi-icon :path="mdiFileTableBoxOutline"></mdi-icon>
        <div class="label">no group</div>
      </router-link>
      <router-link to="/daily" class="link" :class="isDaily && 'current'">
        <mdi-icon :path="mdiCalendarToday"></mdi-icon>
        <div class="label">by date</div>
      </router-link>
      <router-link to="/user" class="link" :class="isUser && 'current'">
        <mdi-icon :path="mdiAccount"></mdi-icon>
        <div class="label">by user</div>
      </router-link>
    </nav>
    <all-page v-if="isAll"></all-page>
    <daily-page v-else-if="isDaily"></daily-page>
    <user-page v-else-if="isUser"></user-page>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { mdiAccount, mdiCalendarToday, mdiFileTableBoxOutline } from "@mdi/js";
import AllPage from "../components/lists/All.vue";
import DailyPage from "../components/lists/Daily.vue";
import UserPage from "../components/lists/User.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    "all-page": AllPage,
    "daily-page": DailyPage,
    "user-page": UserPage,
  },
  setup() {
    const route = useRoute();
    const isAll = computed(() => route.path == "/all");
    const isDaily = computed(() => route.path == "/daily");
    const isUser = computed(() => route.path == "/user");

    return {
      isAll,
      isDaily,
      isUser,

      mdiAccount,
      mdiCalendarToday,
      mdiFileTableBoxOutline,
    };
  },
});
</script>

<style scoped lang="postcss">
.nav {
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
