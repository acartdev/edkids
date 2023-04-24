<template>
  <!-- <tbody> -->
  <tr>
    <td class="text-center">{{ res.date }}</td>
    <td class="text-center">{{ res.nick_name }}</td>
    <td class="text-center">{{ res.first_name + " " + res.last_name }}</td>
    <td class="text-center">{{ res.result }}</td>
    <td class="text-center">
      {{ res.note != "" ? res.note : "-" }}
    </td>
  </tr>
  <!-- </tbody> -->
</template>

<script setup>
import { ref } from "vue";

const res = defineProps({
  date: String,
  first_name: String,
  last_name: String,
  nick_name: String,
  note: String,
  result: String,
});
</script>

<style scoped></style>
