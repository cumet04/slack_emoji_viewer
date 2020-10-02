<template>
  <div class="theme-sample" :style="style">
    <user-message :user-name="userName" :date="slackEmoji.created">
      <div class="emojis">
        <emoji :emoji="slackEmoji"></emoji>
        <emoji :emoji="slackEmoji"></emoji>
        <emoji :emoji="slackEmoji"></emoji>
      </div>
    </user-message>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Themes } from "../theme";
import UserMessage from "../components/UserMessage.vue";
import Emoji from "../components/Emoji.vue";
import IcoUser from "/src/assets/images/ico-user.png";
import IcoSlack from "/src/assets/images/ico-slack.png";

type Props = {
  theme: Theme;
};

export default defineComponent({
  components: {
    "user-message": UserMessage,
    emoji: Emoji,
  },
  props: {
    theme: {
      type: String as PropType<Theme>,
      required: true,
    },
  },
  setup(props: Props) {
    const slackEmoji = {
      userImage: IcoUser,
      userName: "slack",
      created: new Date(),
      aliases: [],
      isAlias: false,
      name: "slack",
      image: IcoSlack,
    } as Emoji;

    return {
      userName: `${props.theme}-theme`,
      slackEmoji,
      style: Themes[props.theme],
    };
  },
});
</script>

<style scoped lang="postcss">
.theme-sample {
  padding: 16px;
  border-radius: 4px;
  color: var(--color-text-primary);
  background-color: var(--color-panel);
}

.emojis {
  display: flex;
}
</style>
