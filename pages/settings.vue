<template>
  <main>
    <div class="form-field">
      <input
        type="text"
        v-model="token_field_value"
        placeholder="slack token"
      />
      <button @click="save_token">set</button>
    </div>
    <p>
      Generate legacy token and set to above from
      <a href="https://api.slack.com/legacy/custom-integrations/legacy-tokens"
        >here</a
      >
    </p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      token_field_value: ""
    };
  },
  methods: {
    save_token() {
      this.$store.commit("emoji/set_token", this.token_field_value);
      this.token_field_value = "";
      alert("token saved");
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}

.emoji {
  margin: 2px;
}
</style>
