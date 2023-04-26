<template>
  <!-- <tbody> -->
  <tr>
    <td class="text-left">{{ res.date }}</td>

    <td class="text-left">{{ res.first_name + " " + res.last_name }}</td>
    <td class="text-left gt-xs">{{ res.nick_name }}</td>
    <td class="text-center">
      {{
        res.result == "good"
          ? "ดี"
          : "" || res.result == "very_good"
          ? "ดีมาก"
          : "" || res.result == "bad"
          ? "ดื้อ"
          : ""
      }}
    </td>
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

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
