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
    <q-item-section center class="text-center">
      <q-item-label>
        <span class="text-weight-medium text-center">{{
          student.status ? "นัเรียนเกณฑ์ปกติ" : "นักเรียนเกณฑ์ปกติ"
        }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section center side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          @click="show = !show"
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
          round
          icon="groups"
          color="teal"
          ><q-tooltip>ข้อมูลผู้ปกครอง</q-tooltip></q-btn
        >
      </div>
    </q-item-section>

    <!-- edit -->
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">แก้ไขข้อมูลนักเรียน</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
            <div class="col-sm-6 flex flex-center">
              <q-img
                height="200px"
                width="150px"
                :src="res.image.thumbnail"
              ></q-img>
            </div>
            <div class="col-sm-6">
              <div class="row q-gutter-sm justify-around items-center">
                <div class="col-sm-11">
                  <div class="row">
                    <div class="col-sm-3">
                      <q-input
                        disable
                        color="teal"
                        v-model="special"
                        label="รหัสนักเรียน"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <q-input
                    clearable
                    color="teal"
                    v-model="first_name"
                    label="ชื่อจริง"
                  />
                </div>
                <div class="col-sm-5">
                  <q-input
                    clearable
                    color="teal"
                    v-model="last_name"
                    label="นามสกุล"
                  />
                </div>
                <div class="col-sm-5">
                  <q-input
                    clearable
                    color="teal"
                    v-model="nick_name"
                    label="ชื่อเล่น"
                  />
                </div>
                <div class="col-sm-5">
                  <q-input
                    clearable
                    color="teal"
                    mask="####/##/##"
                    fill-mask
                    v-model="birth_date"
                    label="วันเดือนปีเกิด"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            color="negative"
            flat
            label="ยกเลิก"
            @click="(show = false), alertWarning()"
          />
          <q-btn
            color="warning"
            flat
            label="แก้ไขข้อมูล"
            @click="
              updateProcessed(),
                alertSuccess(
                  'แก้ไขข้อมูลสำเร็จ',
                  `แก้ไขข้อมูลของ ${res.nick_name} สำเร็จ`
                )
            "
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- edit -->
    <parent :show="pops" :id="res.id" @close="closePop()"></parent>
  </q-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import Parent from "./Parent.vue";
import { useRoute } from "vue-router";
import { StudentApi } from "src/api/StudentApi";
import { ref, onMounted } from "vue";
import { alertShow } from "src/composable/alertShow";

const router = useRoute();
const { alertWarning, alertSuccess } = alertShow();
const $q = useQuasar();
const { deleteStudent, updateStudent } = StudentApi();
const show = ref(false);
const special = ref(res.special);
const first_name = ref(res.first_name);
const last_name = ref(res.last_name);
const nick_name = ref(res.nick_name);
const emit = defineEmits(["index"]);
const pops = ref(false);
const birth_date = ref(res.birth_date);
const closePop = () => {
  pops.value = false;
};
const year = ref();
const updateProcessed = async () => {
  if (!first_name.value) {
    first_name.value = res.first_name;
  } else if (!last_name.value) {
    last_name.value = res.last_name;
  } else if (!nick_name.value) {
    nick_name.value = res.nick_name;
  } else if (!birth_date.value) {
    birth_date.value = res.birth_date;
  }
  const response = await updateStudent({
    id: res.id,
    first_name: first_name.value,
    last_name: last_name.value,
    nick_name: nick_name.value,
    birth_date: birth_date.value,

    img_file: "",
  });

  success();
};

const res = defineProps({
  index: Number,
  image: {
    type: String,
    default: "src/assets/logo_edkids.png",
  },
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
    type: Boolean,
  },
  gender: {
    type: Number,
  },
  room: {
    type: String,
  },
  register_date: {
    type: Number,
  },
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
onMounted(() => {
  if (res) {
    student.value = res;
  }
});
</script>

<style lang="scss" scoped></style>
