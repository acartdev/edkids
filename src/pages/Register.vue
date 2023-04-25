<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <q-page class="">
    <div class="row fit">
      <div
        class="col-sm-8 q-mx-auto q-mt-md bg-yellow-3 q-py-sm q-px-lg text-amber-8"
        style="border-radius: 5px"
      >
        <span class="text- text-weight-bold">กรุณากรอก!!</span>
        ข้อมูลให้ครบถ้วนและถูกต้องตามหลักความเป็นจริง
        และได้รับการยืนยันจากเจ้าของข้อมูลโดยตรงเสียก่อน
      </div>
    </div>
    <q-form @submit="create()">
      <div class="row items-center justify-center q-mt-xl">
        <q-card class="col-sm-8 no-shadow">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="secondary"
            indicator-color="secondary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="mails" label="ผู้ปกครอง" />
            <q-tab name="alarms" label="นักเรียน" />
            <q-tab name="more" label="เพิ่มนักเรียน" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel class="col-sm-7" name="mails">
              <div class="row justify-around q-mt-sm">
                <div class="col-sm-12 q-pl-lg flex">
                  <q-file
                    outlined
                    color="teal"
                    v-model="imageFile.parent"
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon name="image" />
                    </template>
                  </q-file>
                  <p class="text-center q-pt-sm q-ml-sm">รูปภาพของผู้ปกครอง</p>
                </div>
                <div class="col-sm-5">
                  <label for="">ชื่อจริง:</label>
                  <q-input
                    v-model="parent.first_name"
                    outlined
                    dense
                    color="teal"
                    label="ชื่อจริง"
                    :rules="[(val) => !!val || 'กรุณากรอกชื่อจริง']"
                  />
                </div>

                <div class="col-sm-5">
                  <label for="">นามสกุลจริง:</label>

                  <q-input
                    v-model="parent.last_name"
                    outlined
                    dense
                    color="teal"
                    label="นามสกุล"
                    :rules="[(val) => !!val || 'กรุณากรอกนามสกุล']"
                  />
                </div>
              </div>
              <div class="row items-center q-gutter-md justify-center q-mt-sm">
                <div class="col-sm-3">
                  <label for="">ชื่อเล่น:</label>

                  <q-input
                    v-model="parent.nick_name"
                    outlined
                    dense
                    color="teal"
                    label="ชื่อเล่น"
                    :rules="[(val) => !!val || 'กรุณากรอกชื่อเล่น']"
                  />
                </div>
                <div class="col-sm-1">
                  <q-input v-model="old.parent" label="อายุ" disable></q-input>
                </div>
                <div class="col-sm-1 q-mr-md q-pt-lg">
                  <p class="text-h6">ปี</p>
                </div>
                <div class="col-sm-5">
                  <label for="">วัน/เดือน/ปี เกิด:</label>
                  <q-input
                    @blur="getYear()"
                    color="teal"
                    v-model="parent.birth_date"
                    type="date"
                    :rules="[(val) => !!val || 'กรุณากรอกวันเดือนปีเกิด']"
                  />
                </div>
              </div>
              <div class="row justify-around q-gutter-sm items-center q-mt-sm">
                <div class="col-sm-5">
                  <label for="">อาชีพ:</label>
                  <q-input
                    v-model="parent.ocupation"
                    label="วิศวกร"
                    outlined
                    color="teal"
                    dense
                    :rules="[(val) => !!val || 'กรุณากรอกอาชีพ']"
                  ></q-input>
                </div>
                <div class="col-sm-5">
                  <label for="">อีเมลล์:</label>
                  <q-input
                    v-model="parent.email"
                    label="parentEmail@domain.com"
                    outlined
                    dense
                    color="teal"
                    :rules="[(val) => !!val || 'กรุณากรอกอีเมล']"
                  ></q-input>
                </div>
              </div>
              <div class="row justify-around q-gutter-sm items-center q-mt-sm">
                <div class="col-sm-4">
                  <label for="">เบอร์โทรศัพท์:</label>
                  <q-input
                    v-model="parent.phone"
                    mask="###-###-####"
                    outlined
                    color="teal"
                    dense
                    label="088-888-8888"
                    :rules="[(val) => !!val || 'กรุณากรอกเบอร์โทรศัพท์']"
                  ></q-input>
                </div>
                <div class="col-sm-2 q-pt-md"></div>
                <div class="col-sm-3">
                  <label for="">รหัสไปรษณีย์:</label>
                  <q-input
                    v-model="parent.zip_code"
                    color="teal"
                    outlined
                    dense
                  ></q-input>
                </div>
              </div>
              <div class="flex justify-end items-center q-mt-md q-mr-lg">
                <div class="">
                  <q-btn
                    @click="tab = 'alarms'"
                    class="text-teal"
                    outline
                    rounded
                    :icon-right="biArrowBarRight"
                    label="นักเรียน "
                    align="left"
                  >
                  </q-btn>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="row q-gutter-sm justify-around q-mt-sm">
                <div class="col-sm-6 q-pl-lg flex">
                  <q-file
                    outlined
                    color="teal"
                    dense
                    v-model="imageFile.student"
                  >
                    <template v-slot:prepend>
                      <q-icon name="image" />
                    </template>
                  </q-file>
                  <p class="text-center q-pt-sm q-ml-sm">รูปภาพของนักเรียน</p>
                </div>
                <div class="col-sm-5 flex justify-end items-center"></div>
                <div class="col-sm-11">
                  <q-radio
                    keep-color
                    v-model="student.gender"
                    :val="true"
                    label="เด็กชาย"
                    color="teal"
                  />
                  <q-radio
                    keep-color
                    v-model="student.gender"
                    :val="false"
                    label="เด็กหญิง"
                    color="pink"
                  />
                </div>
                <div class="col-sm-5">
                  <label for="">ชื่อจริง:</label>
                  <q-input
                    v-model="student.first_name"
                    outlined
                    dense
                    color="secondary"
                    label="ชื่อจริง"
                  />
                </div>
                <div class="col-sm-5">
                  <label for="">นามสกุลจริง:</label>

                  <q-input
                    v-model="student.last_name"
                    outlined
                    dense
                    color="secondary"
                    label="นามสกุล"
                  />
                </div>
              </div>
              <div class="row items-center q-gutter-md justify-center q-mt-sm">
                <div class="col-sm-3">
                  <label for="">ชื่อเล่น:</label>

                  <q-input
                    v-model="student.nick_name"
                    outlined
                    dense
                    color="secondary"
                    label="ชื่อเล่น"
                  />
                </div>
                <div class="col-sm-1">
                  <q-input v-model="old.student" label="อายุ" disable></q-input>
                </div>
                <div class="col-sm-1 q-mr-md q-pt-lg">
                  <p class="text-h6">ขวบ</p>
                </div>
                <div class="col-sm-5">
                  <label for="">วัน/เดือน/ปี เกิด:</label>

                  <q-input
                    @blur="getYear()"
                    v-model="student.birth_date"
                    color="teal"
                    type="date"
                  />
                </div>
              </div>

              <div
                class="flex justify-end q-gutter-sm items-center q-mt-md q-mr-lg"
              >
                <div class="">
                  <q-btn
                    type="submit"
                    class="text-secondary q-mr-sm"
                    outline
                    rounded
                    label="บันทึก"
                  ></q-btn>
                  <q-btn
                    class="text-warning"
                    @click="clear(), (tab = 'mails'), alertWarning()"
                    outline
                    rounded
                    label="ยกเลิก"
                  ></q-btn>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="more">
              <div class="row q-gutter-sm justify-around q-mt-sm">
                <div class="col-sm-6 q-pl-lg flex">
                  <q-file
                    outlined
                    color="teal"
                    dense
                    v-model="imageFile.student"
                  >
                    <template v-slot:prepend>
                      <q-icon name="image" />
                    </template>
                  </q-file>
                  <p class="text-center q-pt-sm q-ml-sm">รูปภาพของนักเรียน</p>
                </div>
                <div class="col-sm-5 flex justify-end items-center">
                  <q-select
                    v-model="selectPr"
                    :options="options"
                    color="teal"
                    @update:model-value="test"
                    label="เลือกผู้ปกครอง"
                    style="width: 250px"
                  />
                </div>
                <div class="col-sm-11">
                  <q-radio
                    keep-color
                    v-model="student.gender"
                    :val="true"
                    label="เด็กชาย"
                    color="teal"
                  />
                  <q-radio
                    keep-color
                    v-model="student.gender"
                    :val="false"
                    label="เด็กหญิง"
                    color="pink"
                  />
                </div>
                <div class="col-sm-5">
                  <label for="">ชื่อจริง:</label>
                  <q-input
                    v-model="student.first_name"
                    outlined
                    dense
                    color="secondary"
                    label="ชื่อจริง"
                  />
                </div>
                <div class="col-sm-5">
                  <label for="">นามสกุลจริง:</label>

                  <q-input
                    v-model="student.last_name"
                    outlined
                    dense
                    color="secondary"
                    label="นามสกุล"
                  />
                </div>
              </div>
              <div class="row items-center q-gutter-md justify-center q-mt-sm">
                <div class="col-sm-3">
                  <label for="">ชื่อเล่น:</label>

                  <q-input
                    v-model="student.nick_name"
                    outlined
                    dense
                    color="secondary"
                    label="ชื่อเล่น"
                  />
                </div>
                <div class="col-sm-1">
                  <q-input v-model="old.student" label="อายุ" disable></q-input>
                </div>
                <div class="col-sm-1 q-mr-md q-pt-lg">
                  <p class="text-h6">ขวบ</p>
                </div>
                <div class="col-sm-5">
                  <label for="">วัน/เดือน/ปี เกิด:</label>

                  <q-input
                    @blur="getYear()"
                    v-model="student.birth_date"
                    color="teal"
                    type="date"
                  />
                </div>
              </div>

              <div
                class="flex justify-end q-gutter-sm items-center q-mt-md q-mr-lg"
              >
                <div class="">
                  <q-btn
                    @click="addParent"
                    class="text-secondary q-mr-sm"
                    outline
                    rounded
                    label="บันทึก"
                  ></q-btn>
                  <q-btn
                    class="text-warning"
                    @click="clear(), (tab = 'mails'), alertWarning()"
                    outline
                    rounded
                    label="ยกเลิก"
                  ></q-btn>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { biArrowBarRight } from "@quasar/extras/bootstrap-icons";
import { ref, onMounted } from "vue";
import { alertShow } from "src/composable/alertShow";
import { useAuthenStore } from "src/stores/authen";
import { StudentApi } from "src/api/StudentApi";
import { ParentApi } from "src/api/ParentApi";
import { FileApi } from "src/api/FileApi";
import { teacherKey } from "src/boot/utils/config";
import { ManageApi } from "src/api/ManageParent";
import { useRouter } from "vue-router";
import { Loading, QSpinnerGears, LocalStorage, useMeta } from "quasar";
useMeta({ title: "สมัครเรียน" });
const selectPr = ref("เลือกผู้ปกครองของนักเรียน");
const listOption = ref([]);
const room = LocalStorage.getItem(teacherKey);
const authenStore = useAuthenStore();
const { alertSuccess, alertWarning, alertDanger } = alertShow();
const { uploadImageApi } = FileApi();
const { createStudent } = StudentApi();
const lastParentId = ref([]);
const lastStudentId = ref([]);
const { addManage } = ManageApi();
const { createParent, selectParents } = ParentApi();
const router = useRouter();
const parentId = ref();
const options = [];
const imageFile = ref({
  parent: "",
  student: "",
});
const old = ref({
  student: {
    type: String,
    default: " ",
  },
  parent: {
    type: String,
    default: " ",
  },
});
old.value.student = "";
old.value.parent = "";

const student = ref({
  special: "",
  first_name: "",
  last_name: "",
  nick_name: "",
  birth_date: "",
  img_file: "",
  teacher_id: "",
  gender: "",
  room: "",
  status: true,
});
const parent = ref({
  first_name: "",
  last_name: "",
  nick_name: "",
  birth_date: "",
  phone: "",
  zip_code: "",
  email: "",
  ocupation: "",
  img_file: "",
});

const year = ref("");
const tab = ref("mails");
const getYear = () => {
  const date = new Date();

  if (parent.value.birth_date) {
    const birtYear = parent.value.birth_date.substring(0, 4);
    year.value = date.getFullYear() - Number(birtYear);

    if (year.value > 0 && year.value < 100) {
      old.value.parent = year.value;
    } else {
      old.value.parent = "";
    }
    // console.log(parent.value.birth_date);
  }

  if (student.value.birth_date) {
    old.value.student = "";
    const birtYear = student.value.birth_date.substring(0, 4);
    year.value = date.getFullYear() - Number(birtYear);
    if (year.value > 0 && year.value < 100) {
      old.value.student = year.value;
    } else {
      old.value.student = "";
    }
  }
};
const addParent = async () => {
  if (parentId.value) {
    if (imageFile.value.student) {
      const fileNameResponse = await uploadImageApi(imageFile.value.student);
      console.log("uploadImageApi", fileNameResponse);
      if (fileNameResponse && fileNameResponse.imageName) {
        student.value.img_file = fileNameResponse.imageName;
      }
    }
    student.value.room = room;
    student.value.teacher_id = authenStore.auth;
    const response = await createStudent(student.value);
    if (response && response.entity) {
      lastStudentId.value = response.entity.id;
    }

    if (parentId.value) {
      const addToManage = await addManage({
        students_id: lastStudentId.value,
        parent_id: parentId.value,
      });
    }
    await alertSuccess(
      "เพิ่มข้อมูลนักเรียนสำเร็จ",
      `ข้อมูลนักเรียนล่าสุดได้ถูกเพิ่มแล้ว`
    );
    student.value = {};
  } else {
    alertDanger(
      "สมัครรับข้อมูลไม่สำเร็จ",
      "ไม่สามารถสมัครรับข้อมูลกรุณาตรวจสอบข้อมูลให้ครบถ้วน"
    );
  }
};

const create = async () => {
  if (
    student.value.first_name != "" ||
    student.value.last_name != "" ||
    student.value.nick_name != "" ||
    parent.value.first_name != "" ||
    parent.value.last_name != "" ||
    parent.value.nick_name != "" ||
    parent.value.ocupation != "" ||
    parent.value.birth_date != "" ||
    student.value.birth_date != ""
  ) {
    student.value.room = room;
    student.value.teacher_id = authenStore.auth;
    Loading.show({
      spinner: QSpinnerGears,
    });
    if (imageFile.value.parent) {
      const fileNameResponse = await uploadImageApi(imageFile.value.parent);
      console.log("uploadImageApi", fileNameResponse);
      if (fileNameResponse && fileNameResponse.imageName) {
        parent.value.img_file = fileNameResponse.imageName;
      }
    }
    if (imageFile.value.student) {
      const fileNameResponse = await uploadImageApi(imageFile.value.student);
      console.log("uploadImageApi", fileNameResponse);
      if (fileNameResponse && fileNameResponse.imageName) {
        student.value.img_file = fileNameResponse.imageName;
      }
    }

    const responseParent = await createParent(parent.value);
    responseParent.entity.forEach((items) => {
      lastParentId.value = items.id;
      console.log(responseParent);
    });

    const response = await createStudent(student.value);
    console.log(response);
    if (response && response.entity) {
      lastStudentId.value = response.entity.id;
    }

    const addToManage = await addManage({
      students_id: lastStudentId.value,
      parent_id: lastParentId.value,
    });
    console.log(addToManage);

    Loading.hide();
    await alertSuccess(
      "สมัครข้อมูลนักเรียนสำเร็จ",
      `ข้อมูลนักเรียนล่าสุดได้ถูกเพิ่มแล้ว`
    );

    router.push("/list");
  } else {
    alertDanger(
      "สมัครรับข้อมูลไม่สำเร็จ",
      "ไม่สามารถสมัครรับข้อมูลกรุณาตรวจสอบข้อมูลให้ครบถ้วน"
    );
  }
};
const listSelect = async () => {
  const response = await selectParents();
  if (response) {
    listOption.value = response.entity;
    listOption.value.forEach((items) => {
      options.push({
        label: items.first_name + " " + items.last_name,
        values: items.id,
      });
    });
  }
};
const test = (val) => {
  console.log(val.values);
  parentId.value = val.values;
};
onMounted(() => {
  listSelect();
});
</script>

<style lang="scss" scoped></style>
