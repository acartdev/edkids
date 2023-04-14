<template>
  <!-- {{ res.first_name }} -->
  <q-item class="shadow-2 bg-grey-3" style="border-radius: 16px;r">
    <q-item-section avatar center>
      <q-avatar size="70px">
        <img
          style="object-fit: cover; object-position: top"
          :src="res.image.thumbnail"
          alt=""
        />
      </q-avatar>
    </q-item-section>

    <q-item-section top class="col-2 gt-md">
      <q-item-label class="q-mt-sm">น้อง{{ res.nick_name }}</q-item-label>
    </q-item-section>

    <q-item-section center>
      <q-item-label>
        <span class="text-weight-medium">
          {{ res.gender ? "เด็กชาย" : "เด็กหญิง" }}
          {{ res.first_name + " " + res.last_name }}</span
        >
        <span class="text-grey-8">->อายุ {{ year }} ขวบ</span>
      </q-item-label>
      <q-item-label caption
        >เตรียมอนุบาล ห้อง {{ res.room }} รหัสนักเรียน {{ res.special }}
      </q-item-label>
    </q-item-section>

    <q-item-section center class="text-center">
      <q-item-label>
        <span class="text-weight-medium text-center">ไม่อยู่ในระบบ</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, onMounted } from "vue";
const old = ref("");
const year = ref();
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
    type: Boolean,
  },
  room: {
    type: Number,
  },
});
onMounted(() => {
  const date = new Date();
  year.value = date.getFullYear() - res.birth_date.substring(0, 4);
});
</script>

<style lang="scss" scoped></style>
