<template>
  <main>
    <section v-for="item in byDate" :key="item.date" class="section">
      <h1 class="date">{{ item.date }}</h1>
      <ul class="list">
        <li v-for="emoji in item.emojis" :key="emoji.name" class="emoji">
          <emoji :emoji="emoji" />
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { fetchStore } from "../store";
import EmojiComponent from "../components/Emoji.vue";

export default defineComponent({
  components: {
    emoji: EmojiComponent,
  },
  setup() {
    const store = fetchStore();

    const formatDate = (source: number) => {
      const date = new Date(source);
      return date.toLocaleDateString();
    };
    const byDate = computed(() => {
      const map = store.emoji.byDate();
      return Object.keys(map)
        .sort()
        .reverse()
        .map((date) => {
          return { date: formatDate(parseInt(date)), emojis: map[date] };
        });
    });

    return {
      formatDate,
      byDate,
    };
  },
});
</script>

<style scoped lang="postcss">
.section {
  margin-bottom: 12px;
}

.date {
  font-size: 15px;
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: 6px;
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  margin: 2px;
}
</style>
