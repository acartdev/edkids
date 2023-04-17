<template>
  <q-item
    class="q-mt-md q-pa-md"
    style="border-bottom: 1px solid #e5e5e5"
    clickable
  >
    <q-item-section>
      <q-item-label
        :class="color"
        style="font-size: 1.3rem"
        class="text-white text-weight-thin text-body1 text-right"
        >{{ props.title }}</q-item-label
      >
    </q-item-section>

    <q-item-section class="" v-if="icon" avatar>
      <q-icon :class="color" class="text-white text-body1" :name="props.icon" />
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },
});
</script>
