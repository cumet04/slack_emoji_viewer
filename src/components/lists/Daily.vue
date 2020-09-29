<template>
  <ul class="days">
    <li v-for="{ date, emojis } in emojis" :key="date" class="day">
      <user-message :user-name="formatDate(date)" :mdi-icon="mdiCalendarToday">
        <ul class="list">
          <li v-for="emoji in emojis" :key="emoji.name" class="emoji">
            <emoji :emoji="emoji" :name="emoji.name"></emoji>
          </li>
        </ul>
      </user-message>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Emoji from "../../components/Emoji.vue";
import UserMessage from "../../components/UserMessage.vue";
import { mdiCalendarToday } from "@mdi/js";
import { useStore } from "../../store";
import { formatDate } from "../../utils";

export default defineComponent({
  components: {
    emoji: Emoji,
    "user-message": UserMessage,
  },
  setup() {
    const store = useStore();
    const emojis = computed(() => store.emoji.forDaily());

    return {
      emojis,
      formatDate,
      mdiCalendarToday,
    };
  },
});
</script>

<style lang="postcss" scoped>
.day:not(:first-of-type) {
  margin-top: 16px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
  margin-top: -8px;
}

.emoji {
  margin: 8px 0 0 4px;
}
</style>
