<template>
  <main>
    <div class="form-field">
      <input type="text" v-model="dataFieldValue" placeholder="data string" />
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
        <pre><code>{{ copyCodeText }}</code></pre>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  data() {
    return {
      dataFieldValue: "",
      copyCodeText: [
        "const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);",
        'window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))'
      ].join("\n")
    };
  },
  methods: {
    save_workspace() {
      this.$store.commit("workspace/set", JSON.parse(this.dataFieldValue));
      this.dataFieldValue = "";
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
}
</style>
