<template>
  <main>
    <section class="section">
      <h1 class="title">Select current workspace</h1>
      <ul>
        <li v-for="workspace in workspaces" :key="workspace.domain">
          <label>
            <input
              v-model="selected"
              type="radio"
              name="workspace"
              :value="workspace.domain"
            />
            {{ workspace.name }}
          </label>
        </li>
      </ul>
    </section>
    <section id="add_workspace" class="section">
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
              v-model="dataFieldValue"
              type="text"
              class="input"
              placeholder="data"
            />
            <button class="button" @click="saveWorkspace">set</button>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { fetchStore } from "../store";

export default defineComponent({
  setup() {
    const store = fetchStore();

    const dataFieldValue = ref("");
    const selected = computed({
      get() {
        const w = store.workspace.current();
        return w ? w.domain : null;
      },
      set(value: string | null) {
        if (value === null) return;
        store.workspace.setCurrent(value);
      },
    });
    const workspaces = computed(() => store.workspace.all());
    const saveWorkspace = () => {
      const w = JSON.parse(dataFieldValue.value);
      store.workspace.add(w);
      store.workspace.setCurrent(w.domain);
      dataFieldValue.value = "";
      alert("token saved");
    };

    const copyCodeText = [
      "const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);",
      'window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))',
    ].join("\n");

    return {
      dataFieldValue,
      selected,
      workspaces,
      saveWorkspace,

      copyCodeText,
    };
  },
});
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
