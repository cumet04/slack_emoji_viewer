<template>
  <main class="inner">
    <div class="group">
      <h1 class="title">WORKSPACES</h1>
      <card class="section">
        <h2 class="title">Add workspace</h2>
        <ol class="steps">
          <li class="step">
            <p>
              Go to
              <a
                href="https://slack.com/customize/emoji"
                class="text-link"
                target="_blank"
              >
                https://slack.com/customize/emoji
              </a>
            </p>
          </li>
          <li class="step">
            <p>Copy this code, and run in devtool/Console</p>
            <textarea
              class="code"
              readonly
              :rows="copyCodeTextRows"
              :cols="copyCodeTextCols"
              :value="copyCodeText"
              @click="$event.target.select()"
            >
            </textarea>
          </li>
          <li class="step">
            <p>Copy output data, and paste it below</p>
            <text-input
              v-model:value="dataFieldValue"
              class="input"
              placeholder="data"
            ></text-input>
          </li>
        </ol>
        <div class="actions">
          <Button @click="saveWorkspace">Add</Button>
        </div>
      </card>
      <card class="section">
        <h2 class="title">Remove workspaces</h2>
        <ul class="workspaces">
          <li v-for="ws in workspaces" :key="ws.domain" class="item">
            <label class="workspace">
              <input
                v-model="selected"
                type="checkbox"
                :value="ws.domain"
                class="checkbox"
              />
              <img class="icon" :src="ws.icon.image_34" />
              <span class="name">{{ ws.name }}</span>
            </label>
          </li>
        </ul>
        <div class="actions">
          <Button danger @click="removeSelected">Remove</Button>
        </div>
      </card>
    </div>

    <div class="group">
      <h1 class="title">APPEARANCE</h1>
      <card class="section">
        <h2 class="title">Theme</h2>
        <theme-sample
          theme="Light"
          class="theme"
          :class="currentTheme == 'Light' && 'active'"
          @click="selectTheme('Light')"
        ></theme-sample>
        <theme-sample
          theme="Dark"
          class="theme"
          :class="currentTheme == 'Dark' && 'active'"
          @click="selectTheme('Dark')"
        ></theme-sample>
      </card>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import TextInput from "../components/TextInput.vue";
import ThemeSample from "../components/ThemeSample.vue";
import { useStore } from "../store";

export default defineComponent({
  components: {
    Button,
    card: Card,
    "text-input": TextInput,
    "theme-sample": ThemeSample,
  },
  setup() {
    const store = useStore();

    const dataFieldValue = ref("");
    const workspaces = computed(() => store.workspace.all());
    const saveWorkspace = () => {
      const w = JSON.parse(dataFieldValue.value);
      store.workspace.add(w);
      store.workspace.setCurrent(w.domain);
      dataFieldValue.value = "";
      alert("token saved");
    };
    const selected = ref([] as string[]);
    const removeSelected = () => {
      const msg = [
        "Remove these workspaces from this app?",
        ...selected.value,
      ].join("\n");
      if (confirm(msg)) {
        selected.value.forEach((domain) => store.workspace.remove(domain));
        selected.value = [];
      }
    };

    const currentTheme = computed(() => store.preference.theme());
    const selectTheme = (t: Theme) => {
      store.preference.setTheme(t);
    };

    const copyCodeText = `const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);
window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))`;
    return {
      dataFieldValue,
      workspaces,
      saveWorkspace,
      selected,
      removeSelected,

      currentTheme,
      selectTheme,

      copyCodeText,
      copyCodeTextRows: copyCodeText.split("\n").length,
      copyCodeTextCols: Math.max(
        ...copyCodeText.split("\n").map((t) => t.length)
      ),
    };
  },
});
</script>

<style scoped lang="postcss">
.group {
  margin-top: 24px;

  & .title {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }
}

.section .title {
  font-size: 2rem;
}

.actions {
  margin-top: 16px;
}

.text-link {
  color: var(--color-primary);
}

.theme {
  &:not(:first-of-type) {
    margin-top: 16px;
  }

  &.active {
    border: solid 1px var(--color-primary);
  }
}

.workspaces {
  & .item:not(:first-child) {
    margin-top: 8px;
  }

  & .workspace {
    display: flex;
    align-items: center;
  }

  & .checkbox {
    margin: 0 8px 0 4px;
  }

  & .name {
    margin-left: 4px;
  }
}

.steps {
  counter-reset: step;
}

.step {
  position: relative;
  --numsize: 3rem;
  margin-left: var(--numsize);
  margin-top: 8px;

  &::before {
    position: absolute;
    left: calc(-0.8 * var(--numsize));
    counter-increment: step;
    content: counter(step) ".";
  }

  & .input {
    margin-top: 4px;
  }

  & .code {
    display: block;
    padding: 8px;
    margin-top: 4px;

    background-color: var(--color-background);
    border: solid 1px var(--color-border);
    border-radius: 4px;

    font-family: monospace;
    resize: none;
  }
}
</style>
