<template>
  <div class="user-message">
    <div class="icon">
      <mdi-icon
        v-if="mdiIcon != ''"
        :path="mdiIcon"
        :style="mdiStyle"
        size="36px"
      ></mdi-icon>
      <img v-else :src="userIcon" class="img" />
    </div>
    <div>
      <div class="info">
        <span class="name">{{ userName }}</span>
        <span v-if="date" class="date">&nbsp;&nbsp;{{ displayDate }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "../utils";
import IcoUser from "/src/assets/images/ico-user.png";

type Props = {
  userIcon: string;
  mdiIcon: string;
  iconColor: string;
  userName: string;
  date?: Date;
};

export default defineComponent({
  props: {
    userIcon: {
      type: String,
      default: IcoUser as string,
    },
    mdiIcon: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: undefined,
    },
  },
  setup(props: Props) {
    const date = props.date && formatDate(props.date);
    const mdiStyle = props.iconColor != "" ? `color: ${props.iconColor};` : "";
    return {
      displayDate: date,
      mdiStyle,
    };
  },
});
</script>

<style scoped lang="postcss">
.user-message {
  display: flex;
  flex-direction: row;
}

.icon {
  width: 44px;
  flex-shrink: 0;
  margin-top: 4px;

  & .img {
    width: 36px;
    height: 36px;
    border-radius: 3px;
  }
}

.info {
  height: 29px;
}

.name {
  font-size: 1.5rem;
  font-weight: bold;
}

.date {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
}
</style>
