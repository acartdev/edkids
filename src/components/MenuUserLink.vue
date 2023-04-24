<template>
  <q-item clickable :to="link">
    <q-item-section>
      <q-item-label class="text-right" :class="color">{{ title }}</q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
    <q-item-section v-if="icon" avatar>
      <q-icon :class="color" :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuUserLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "text-white",
    },
  },
});
</script>
<style scoped>
.q-item {
  font-size: 23px;
  border-bottom: 2px solid #42d293;
}
</style>
