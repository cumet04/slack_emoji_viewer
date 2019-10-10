<template>
  <div class="container">
    <section v-for="(emojis, author) in by_author" v-bind:key="author">
      <h1>
        <img :src="user_image(emojis[0])" class="user_icon" />
        <span>{{ author }}</span>
      </h1>
      <ul class="emoji_container">
        <li v-for="emoji in emojis" v-bind:key="emoji.name" class="emoji">
          <img :src="emoji.url" :title="display_name(emoji.name)" loading="lazy" class="emoji_img" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'emoji',
  computed: {
    by_author: function() {
      const src = [].concat(this.all)
      return src
        .filter(a => a.is_alias == 0)
        .sort((a, b) => {
          return a.created - b.created
        })
        .reduce((map, emoji) => {
          const key = emoji.user_display_name
          if (!(key in map)) map[key] = []
          map[key].push(emoji)
          return map
        }, {})
    }
  },
  methods: {
    display_name: name => `:${name}:`,
    user_image: emoji => {
      const base = 'https://ca.slack-edge.com'
      const size = 48
      return `${base}/${emoji.team_id}-${emoji.user_id}-${emoji.avatar_hash}-${size}`
    }
  },
  data() {
    return {
      all: this.$store.state.emoji.all
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.user_icon {
  display: inline-block;
}

.emoji {
  list-style-type: none;
  padding: 5px;
}

.emoji_img {
  max-width: 50px;
  max-height: 50px;
}

.emoji_container {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}
</style>
