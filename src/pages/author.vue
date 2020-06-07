<template>
  <main>
    <div class="toolbar">
      <filter-input v-model="keyword" class="filter"></filter-input>
      <button class="reload" @click="reloadEmojis">
        <img src="~/assets/images/ico-reload.svg" alt="" />
      </button>
    </div>
    <section v-for="(emojis, author) in byAuthor" :key="author" class="user">
      <user-wrapper :emoji="emojis[0]">
        <ul class="list">
          <li v-for="emoji in emojis" :key="emoji.name" class="emoji">
            <emoji :emoji="emoji" />
          </li>
        </ul>
      </user-wrapper>
    </section>
  </main>
</template>

<script>
import UserWrapper from "~/components/UserWrapper.vue";
import FilterInput from "~/components/FilterInput.vue";
import Emoji from "~/components/Emoji.vue";
import Emojis from "~/store/emojis";

export default {
  components: {
    "user-wrapper": UserWrapper,
    "filter-input": FilterInput,
    emoji: Emoji,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    byAuthor() {
      const filtered = {};
      const all = Emojis.byAuthor();
      for (let user in all) {
        const userEmojis = all[user].filter((e) => {
          const names = [e.name, ...e.aliases?.map((e) => e.name)];
          return names.some((name) => name.includes(this.keyword));
        });
        if (userEmojis.length > 0) filtered[user] = userEmojis;
      }
      return filtered;
    },
  },
  methods: {
    reloadEmojis() {
      Emojis.fetchAll();
    },
  },
};
</script>

<style scoped lang="postcss">
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  & .reload {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
}

.user {
  margin-bottom: 12px;
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.emoji {
  margin: 2px;
}
</style>
