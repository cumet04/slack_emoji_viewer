<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "./Base.vue";
import { mdiCog as path } from "@mdi/js";

export default defineComponent({
  extends: IconBase,
  setup() {
    return {
      path,
    };
  },
});
</script>
