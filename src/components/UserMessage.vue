<template>
  <div class="user-message">
    <div class="icon">
      <mdi-icon v-if="mdiIcon != ''" :path="mdiIcon" size="36px"></mdi-icon>
      <img v-else :src="userIcon" class="img" />
    </div>
    <div>
      <div class="info">
        <span class="name">{{ userName }}</span>
        <span v-if="date" class="date">&nbsp;&nbsp;{{ displayDate }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "../utils";

type Props = {
  userIcon: string;
  mdiIcon: string;
  userName: string;
  date?: string;
};

export default defineComponent({
  props: {
    userIcon: {
      type: String,
      default: "/src/assets/images/ico-user.png",
    },
    mdiIcon: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  setup(props: Props) {
    const date = props.date && formatDate(new Date(Date.parse(props.date)));
    return {
      displayDate: date,
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

  & .img {
    width: 36px;
    height: 36px;
    border-radius: 3px;
  }
}

.info {
  margin-top: 3px;
  margin-bottom: 6px;
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
