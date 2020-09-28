<template>
  <main class="inner">
    <div class="group">
      <h1 class="title">WORKSPACES</h1>
      <card class="section">
        <h2 class="title">Available workspaces</h2>
        <ul class="workspaces">
          <li v-for="ws in workspaces" :key="ws.domain" class="item">
            <mdi-icon
              v-if="ws == currentWorkspace"
              :path="mdiCheckCircleOutline"
              class="check"
            ></mdi-icon>
            <button
              class="button"
              :class="ws == currentWorkspace && 'current'"
              @click="selectWorkspace(ws)"
            >
              <img class="icon" :src="ws.icon.image_34" />
              <span class="name">{{ ws.name }}</span>
            </button>
            <button class="close" @click="removeWorkspace(ws)">
              <mdi-icon :path="mdiCloseCircleOutline" size="16px"></mdi-icon>
            </button>
          </li>
        </ul>
      </card>
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
          <Button @click="addWorkspace">Add</Button>
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

    <div class="group">
      <h1 class="title">ABOUT</h1>
      <card class="section about">
        <h2 class="title">Slack emoji viewer</h2>
        <p class="build">
          Build
          <a :href="commitUrl" class="build-num">{{ buildHash }}</a>
          at {{ buildTime }}
        </p>
        <a :href="githubUrl" class="github">
          <img :src="githubIcon" width="24" height="24" class="img" />
          <p class="url">{{ githubUrl }}</p>
        </a>
      </card>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from "@mdi/js";
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
    const currentWorkspace = computed(() => store.workspace.current());
    const workspaces = computed(() => store.workspace.display());
    const addWorkspace = () => {
      const w = JSON.parse(dataFieldValue.value);
      store.workspace.add(w);
      store.workspace.setCurrent(w.domain);
      dataFieldValue.value = "";
      alert("token saved");
    };
    const selectWorkspace = (ws: Workspace) => {
      store.workspace.setCurrent(ws.domain);
    };
    const removeWorkspace = (ws: Workspace) => {
      const msg = `Do you remove workspace "${ws.domain}" ?`;
      if (confirm(msg)) {
        store.workspace.remove(ws.domain);
      }
    };

    const currentTheme = computed(() => store.preference.theme());
    const selectTheme = (t: Theme) => {
      store.preference.setTheme(t);
    };

    const bhash = import.meta.env.GITHUB_SHA as string;
    const buildHash = bhash.slice(0, 7);
    console.log(import.meta.env.BUILD_TIME);
    const buildTime = new Date(
      parseInt(import.meta.env.BUILD_TIME as string)
    ).toISOString();
    const githubUrl = import.meta.env.REPOSITORY_URL as string;
    const commitUrl = `${githubUrl}/commit/${bhash}`;

    const githubIcon = computed(() =>
      currentTheme.value == "Light"
        ? "/src/assets/images/ico-github.png"
        : "/src/assets/images/ico-github-light.png"
    );

    const copyCodeText = `const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);
window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))`;
    return {
      dataFieldValue,
      workspaces,
      currentWorkspace,
      addWorkspace,
      selectWorkspace,
      removeWorkspace,

      currentTheme,
      selectTheme,

      buildHash,
      commitUrl,
      buildTime,
      githubUrl,
      githubIcon,

      copyCodeText,
      copyCodeTextRows: copyCodeText.split("\n").length,
      copyCodeTextCols: Math.max(
        ...copyCodeText.split("\n").map((t) => t.length)
      ),

      mdiCheckCircleOutline,
      mdiCloseCircleOutline,
    };
  },
});
</script>

<style scoped lang="postcss">
.group {
  &:not(:first-of-type) {
    margin-top: 24px;
  }

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
  & .item {
    display: flex;
    align-items: center;

    &:first-child {
      margin-top: -4px;
    }
  }

  & .check {
    position: absolute;
    color: var(--color-success);
  }

  & .button {
    flex-grow: 1;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding: 4px 0 4px 4px;
    margin-left: 28px;

    cursor: inherit;
    &:hover:not(.current) {
      cursor: pointer;
      background-color: var(--color-background);
    }
  }

  & .name {
    margin-left: 8px;
  }

  & .close {
    color: var(--color-gray);
    border-radius: 12px;
    width: 24px;
    height: 24px;
    padding: 4px;

    &:hover {
      background-color: var(--color-background);
    }
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
    border: solid 1px var(--color-gray);
    border-radius: 4px;

    font-family: monospace;
    resize: none;
  }
}

.about {
  & .build {
    font-size: 1.6rem;
  }

  & .github {
    display: flex;
    margin-top: 4px;

    & .url {
      margin-left: 8px;
    }
  }
}
</style>
