<template>
  <main>
    <section class="section">
      <h1 class="section_title">Select current workspace</h1>
      <ul>
        <li v-for="workspace in workspaces" :key="workspace.domain">
          <label>
            <input
              type="radio"
              name="workspace"
              :value="workspace.domain"
              v-model="selected"
            />
            {{ workspace.name }}
          </label>
        </li>
      </ul>
    </section>
    <section class="section">
      <h1 class="section_title">New/Update workspace</h1>
      <ol>
        <li class="step">
          <p>
            Go to
            <a href="https://slack.com/customize/emoji" target="_blank">
              https://slack.com/customize/emoji
            </a>
          </p>
        </li>
        <li class="step">
          <p>Copy this code, and run in devtool/Console</p>
          <textarea
            class="code"
            readonly
            :value="copyCodeText"
            @click="$event.target.select()"
          ></textarea>
        </li>
        <li class="step">
          <p>Copy output data, and paste it below</p>
          <div class="form-field">
            <input type="text" v-model="dataFieldValue" placeholder="data" />
            <button @click="saveWorkspace">set</button>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      dataFieldValue: "",
      copyCodeText: [
        "const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);",
        'window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))',
      ].join("\n"),
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.getters["workspace/current"]?.domain;
      },
      set(value) {
        this.$store.commit("workspace/setCurrent", value);
        this.$store.commit("emoji/clear");
      },
    },
    workspaces() {
      return Object.values(this.$store.state.workspace.all);
    },
  },
  methods: {
    saveWorkspace() {
      this.$store.commit("workspace/set", JSON.parse(this.dataFieldValue));
      this.$store.commit("emoji/clear");
      this.dataFieldValue = "";
      alert("token saved");
    },
  },
};
</script>

<style scoped lang="scss">
.section {
  margin-bottom: 24px;

  &_title {
    font-weight: bold;
    margin-bottom: 12px;
  }
}

.step {
  list-style: decimal;
  margin-left: 25px;
  margin-bottom: 8px;

  & > p {
    margin-bottom: 4px;
  }
}

.code {
  width: 610px;
  height: 28px;
  padding: 4px;
  resize: none;
  background-color: #eee;
}
</style>
