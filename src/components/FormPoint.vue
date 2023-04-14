<template>
  <tr v-if="res.status">
    <td class="text-center">{{ res.id }}</td>
    <td class="text-center">
      <q-avatar>
        <img
          style="object-fit: cover; object-position: top"
          :src="res.image.thumbnail"
          alt=""
        />
      </q-avatar>
    </td>

    <td class="text-center">{{ res.nick_name }}</td>
    <td class="text-center">
      {{ res.gender ? "เด็กชาย" : "เด็กหญิง" + " " }}
      {{ res.first_name + " " + res.last_name }}
    </td>
    <td class="text-center">
      <q-select
        :options="options"
        outlined
        color="teal"
        label="ความประพฤติ"
        dense
        v-model="point"
      />
    </td>
    <td class="text-right">
      <q-input v-model="note" label="การกระทำ" color="teal" dense></q-input>
    </td>
    <td class="text-center">
      <q-btn color="teal" @click="givePoint()" label="ส่งคะแนน"></q-btn>
    </td>
    <br />
  </tr>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Loading, QSpinnerGears } from "quasar";
import { alertShow } from "src/composable/alertShow";
import { sendPointApi } from "src/api/sendPointApi";
const { alertSuccess } = alertShow();
const point = ref("");
const note = ref("");
const options = [
  {
    label: "ดี",
    values: "good",
  },
  {
    label: "ดีมาก",
    values: "very_good",
  },
  {
    label: "ดื้อ",
    values: "bad",
  },
];
const { sendPoint } = sendPointApi();
const res = defineProps({
  image: {
    type: String,
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
  status: {
    type: Boolean,
  },
  gender: {
    type: Number,
  },
  room: {
    type: String,
  },
  result: {
    type: Number,
  },
});
const clear = () => {
  point.value = "";
  note.value = "";
};
const givePoint = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await sendPoint({
    level: point.value.values,
    note: note.value,
    student_id: res.id,
  });
  console.log(response);
  Loading.hide();
  alertSuccess("ให้คะแนนสำเร็จ", `ให้คะแนนน้อง ${res.nick_name} สำเร็จ`);
  clear();
};
</script>

<style lang="scss" scoped></style>
