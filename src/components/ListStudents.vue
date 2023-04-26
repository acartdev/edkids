<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-item v-if="res.status" class="shadow-5" style="border-radius: 16px">
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
      <q-item-label class="q-mt-sm">น้อง{{ student.nick_name }}</q-item-label>
    </q-item-section>

    <q-item-section center>
      <q-item-label>
        <span class="text-weight-medium"
          >{{ student.gender ? "เด็กชาย" : "เด็กหญิง" }}
          {{ student.first_name + " " + student.last_name }}</span
        >
        <span class="text-grey-8">->อายุ {{ year }} ขวบ</span>
      </q-item-label>
      <q-item-label caption
        >เตรียมอนุบาล ห้อง {{ student.room }} รหัสนักเรียน {{ student.special }}
      </q-item-label>
    </q-item-section>
    <q-item-section center class="text-center dissmiss">
      <q-item-label>
        <span class="text-weight-medium text-center">{{
          student.status ? "นักเรียนเกณฑ์ปกติ" : "นักเรียนเกณฑ์ปกติ"
        }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section center side>
      <div class="dissmiss">
        <q-btn
          :to="`/edit-student/edit/${res.id}`"
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="edit"
          color="warning"
          ><q-tooltip>แก้ไขข้อมูล</q-tooltip></q-btn
        >
        <q-btn
          class="gt-xs"
          @click="confirm()"
          size="12px"
          flat
          dense
          round
          color="negative"
          icon="delete"
          ><q-tooltip>ลบข้อมูล</q-tooltip></q-btn
        >

        <q-btn
          size="12px"
          @click="pops = !pops"
          flat
          dense
          :to="`/edit-student/list/${res.id}`"
          round
          icon="groups"
          color="teal"
          ><q-tooltip>ข้อมูลผู้ทั้งหมดของนักเรียน</q-tooltip></q-btn
        >
      </div>
      <q-btn class="show" dense="" flat="" icon="expand_more">
        <q-menu fit="">
          <q-list>
            <q-item>
              <q-item-section>
                <q-btn
                  :to="`/edit-student/edit/${res.id}`"
                  size="12px"
                  flat
                  dense
                  round
                  icon="edit"
                  color="warning"
                  ><q-tooltip>แก้ไขข้อมูล</q-tooltip></q-btn
                >
                <q-btn
                  @click="confirm()"
                  size="12px"
                  flat
                  dense
                  round
                  color="negative"
                  icon="delete"
                  ><q-tooltip>ลบข้อมูล</q-tooltip></q-btn
                >

                <q-btn
                  size="12px"
                  @click="pops = !pops"
                  flat
                  dense
                  :to="`/edit-student/list/${res.id}`"
                  round
                  icon="groups"
                  color="teal"
                  ><q-tooltip>ข้อมูลผู้ทั้งหมดของนักเรียน</q-tooltip></q-btn
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useQuasar } from "quasar";

import { StudentApi } from "src/api/StudentApi";
import { ref, onMounted } from "vue";
import { alertShow } from "src/composable/alertShow";
const { alertWarning, alertSuccess } = alertShow();
const $q = useQuasar();
const { deleteStudent } = StudentApi();
const show = ref(false);
const emit = defineEmits(["index"]);
const pops = ref(false);
const year = ref();
const res = defineProps({
  index: Number,
  search: String,
  image: {},
  birth_date: {
    type: String,
    default: "",
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
    type: Number,
  },
  gender: {
    type: Number,
  },
  room: {},
  img_file: String,
});
const student = ref({
  special: "",
  first_name: "",
  last_name: "",
  nick_name: "",
  birth_date: "",
  img_file: "",
  status: "",
  room: "",
  gender: "",
});

onMounted(() => {
  student.value = res;
  const date = new Date();
  year.value = date.getFullYear() - res.birth_date.substring(0, 4);
});

const confirm = () => {
  $q.dialog({
    title: "ยืนยันการลบ?",
    message: "คุณต้องการลบนักเรียนคนนี้หรือไม่",
    cancel: {
      color: "warning",
      push: true,
    },
    ok: {
      color: "negative",
      push: true,
    },
    persistent: true,
  })
    .onOk(async () => {
      await deleteStudent(res.id);
      await alertSuccess(
        "ลบข้อมูลสำเร็จ",
        `"ข้อมูลของ ${res.nick_name} ถูกจัดเก็บแล้ว"`
      );
      emit("index");
    })

    .onCancel(() => {
      alertWarning();
    });
};
</script>

<style lang="scss" scoped>
body.screen--xs {
  .dissmiss {
    display: none;
  }
  .show {
    display: block;
  }
}
body.screen--md {
  .show {
    display: none;
  }
}
</style>
