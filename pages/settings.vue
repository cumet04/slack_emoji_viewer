<template>
  <main>
    <ol>
      <li class="step">
        Go to
        <a href="https://slack.com/customize/emoji" target="_blank">
          https://slack.com/customize/emoji
        </a>
      </li>
      <li class="step">
        Copy this code, and run in devtool/Console
        <pre><code>{{ copyCodeText }}</code></pre>
      </li>
      <li class="step">
        Copy output data, and paste it below
        <div class="form-field">
          <input type="text" v-model="dataFieldValue" placeholder="data" />
          <button @click="save_workspace">set</button>
        </div>
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
