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
    <ol>
      <li class="step">
        Go to
        <a href="https://slack.com/customize/emoji" target="_blank">
          https://slack.com/customize/emoji
        </a>
      </li>
      <li class="step">
        Open devtool, and focus "Console"
      </li>
      <li class="step">
        Paste below:
        <pre>window.prompt("token:",TS.boot_data.api_token)</pre>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  data() {
    return {
      workspace_field_value: this.$store.state.emoji.workspace,
      token_field_value: ""
    };
  },
  methods: {
    save_workspace() {
      this.$store.commit("emoji/set_workspace", this.workspace_field_value);
      this.$store.commit("emoji/set_token", this.token_field_value);
      this.token_field_value = "";
      alert("token saved");
    }
  }
};
</script>

<style scoped lang="scss">
.step {
  list-style: decimal;
}

pre {
  background-color: lightgray;
  font-family: Consolas, monospace;
}
</style>
