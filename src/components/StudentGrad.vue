<template>
  <tr v-if="res.status">
    <td class="text-center">{{ res.id }}</td>
    <td class="text-center">
      <q-img
        height="70px"
        width="70px"
        :src="res.image.thumbnail"
        style="object-fit: cover"
      ></q-img>
    </td>
    <td class="text-center">
      {{ res.gender ? "เด็กชาย" : "เด็กหญิง" }}
      {{ res.first_name + " " + res.last_name }}
    </td>
    <td class="text-center">{{ res.nick_name }}</td>
    <td class="text-right">
      <span class="flex justify-around"
        ><p class="text-body2">ดีมาก {{ res.very_good }}</p>
        <p class="text-body2">ดี {{ res.good }}</p>
        <p class="text-body2">ดื้อ {{ res.bad }}</p>
      </span>
    </td>
  </tr>
</template>

<script setup>
const res = defineProps({
  image: {
    default: "src/assets/logo_edkids.png",
  },
  birth_date: {
    type: String,
    default: "asdasd",
  },
  nick_name: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  id: {
    type: Number,
  },
  special: {
    type: String,
  },
  status: {},
  gender: {
    type: Number,
  },
  room: {
    type: String,
  },
  very_good: {
    type: Number,
  },
  good: {
    type: Number,
  },
  bad: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
