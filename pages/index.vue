<template>
  <main>
    <filter-input v-model="keyword" class="filter"></filter-input>
    <ul class="list">
      <li
        v-for="emoji in all"
        :key="emoji.name"
        v-show="emoji.name.includes(keyword)"
        class="emoji"
      >
        <emoji :emoji="emoji" />
      </li>
    </ul>
  </main>
</template>

<script>
import Emoji from "~/components/Emoji.vue";
import FilterInput from "~/components/FilterInput.vue";

export default {
  components: {
    emoji: Emoji,
    "filter-input": FilterInput,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    all() {
      return this.$store.getters["emoji/all"];
    },
  },
};
</script>

<style scoped lang="scss">
.filter {
  margin-bottom: 16px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}

.emoji {
  margin: 2px;
}
</style>
