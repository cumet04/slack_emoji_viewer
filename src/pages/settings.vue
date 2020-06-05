<template>
  <main>
    <section class="section">
      <h1 class="title">Select current workspace</h1>
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
    <section class="section" id="add_workspace">
      <h1 class="title">Add/Update workspace</h1>
      <ol class="steps">
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
            <input
              type="text"
              class="input"
              v-model="dataFieldValue"
              placeholder="data"
            />
            <button class="button" @click="saveWorkspace">set</button>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script>
import Workspaces from "~/store/workspaces";

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
        return Workspaces.current()?.domain;
      },
      set(value) {
        Workspaces.setCurrent(value);
      },
    },
    workspaces() {
      return Workspaces.all();
    },
  },
  methods: {
    saveWorkspace() {
      const w = JSON.parse(this.dataFieldValue);
      Workspaces.add(w);
      Workspaces.setCurrent(w.domain);
      this.dataFieldValue = "";
      alert("token saved");
    },
  },
};
</script>

<style scoped lang="postcss">
.section {
  margin-bottom: 12px;
}

.steps {
  counter-reset: step;
}

.step {
  position: relative;
  margin-left: 25px;

  &::before {
    position: absolute;
    left: -25px;
    counter-increment: step;
    content: counter(step) ".";
  }
}

.code {
  width: 650px;
  height: 36px;
  padding: 4px;
  resize: none;
  font-family: monospace;
  background-color: #eee;
}

.input {
  border: solid 1px gray;
  padding: 0 4px;
}

.button {
  background-color: lightgray;
  border: solid 1px gray;
  padding: 0 4px;
}
</style>
