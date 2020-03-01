<template>
  <main>
    <div class="form-field">
      <input
        type="text"
        v-model="workspace_field_value"
        placeholder="slack workspace name"
      />
      <input
        type="text"
        v-model="token_field_value"
        placeholder="slack token"
      />
      <button @click="save_workspace">set</button>
    </div>
    <p>
      Go to
      <a href="https://slack.com/customize/emoji" target="_blank">
        https://slack.com/customize/emoji
      </a>
      and open devtool/Network tab, then find request to emoji.adminList, and
      get token from FormData in the requst.
    </p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      workspace_field_value: "",
      token_field_value: ""
    };
  },
  methods: {
    save_workspace() {
      this.$store.commit("emoji/set_workspace", this.workspace_field_value);
      this.$store.commit("emoji/set_token", this.token_field_value);
      this.workspace_field_value = "";
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
