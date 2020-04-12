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

<script>
import Emoji from "~/components/Emoji.vue";

export default {
  components: {
    emoji: Emoji,
  },
  computed: {
    byDate() {
      const map = this.$store.getters["emoji/byDate"];
      return Object.keys(map)
        .sort()
        .reverse()
        .map((date) => {
          return { date: this.formatDate(parseInt(date)), emojis: map[date] };
        });
    },
  },
  methods: {
    formatDate(source) {
      const date = new Date(source);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style scoped lang="scss">
main {
  width: 720px;
}

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
