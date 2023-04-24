<template>
  <q-card flat="" class="" style="border-bottom: 1px dashed black">
    <q-form @submit="updateProcess">
      <q-card-section>
        <p class="text-center text-h6">ข้อมูลของนักเรียน</p>
        <div class="row q-mt-md">
          <div class="col-sm-3">
            <q-file
              display-value=""
              @update:model-value="imageProcess"
              dense=""
              class="absolute"
              v-model="imageList"
              borderless=""
            >
              <slot
                ><q-icon
                  class="text-h5 text-teal"
                  name="add_photo_alternate"
                ></q-icon
              ></slot>
            </q-file>
            <q-img
              class="profile"
              :src="imageUrl ? imageUrl : studentEntity.image?.thumbnail"
              height="150px"
              width="170px"
            >
            </q-img>
          </div>
          <div class="col-sm-8">
            <div class="row justify-around">
              <div class="col-sm-5">
                <q-input
                  v-model="student.first_name"
                  :readonly="studentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ชื่อจริง</p>
                  </template>
                  <template v-slot:prepend>
                    <p class="text-caption text-dark text-center q-pt-md">
                      {{ studentEntity.gender ? "เด็กชาย" : "เด็กหญิง" }}
                    </p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="student.last_name"
                  :readonly="studentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">นามสกุล</p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl">
              <div class="col-sm-5">
                <q-input
                  v-model="student.nick_name"
                  :readonly="studentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ชื่อเล่น</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="birth_date"
                  :readonly="studentEntity.pms"
                  @update:model-value="revertDate"
                  dense=""
                  mask="##/##/####"
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">
                      วัน/เดือน/ปี/ เกิด
                    </p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl">
              <div class="col-sm-5">
                <q-input
                  v-model="age"
                  :readonly="true"
                  class="q-mr-xl"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">อายุ</p>
                  </template>
                  <template v-slot:after>
                    <p class="text-caption text-center q-pt-md q-mr-xl">ขวบ</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="student.room"
                  :readonly="studentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ห้อง</p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl">
              <div class="col-sm-5">
                <q-input v-model="regisDate" :readonly="true" class="" dense="">
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">
                      สมัครเมื่อวันที่
                    </p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input v-model="student.special" :readonly="true" dense="">
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">รหัสนักเรียน</p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl q-mb-xl">
              <div class="col-sm-5">
                <q-input
                  v-model="teacherName"
                  :readonly="true"
                  class=""
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ครูผู้สมัคร</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="teacherEntity.position"
                  :readonly="true"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ตำแหน่ง</p>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="!studentEntity.pms" class="q-pr-lg" align="right">
        <q-btn type="submit" color="warning" label="แก้ไข"></q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { teacherApi } from "src/api/Teacher";
import { alertShow } from "src/composable/alertShow";
import { FileApi } from "src/api/FileApi";
import { StudentApi } from "src/api/StudentApi";
const { alertSuccess } = alertShow();
const { updateStudent } = StudentApi();
const { uploadImageApi } = FileApi();
const { getTeacher } = teacherApi();
const birth_date = ref();
const teacherName = ref();
const studentEntity = ref({});
const teacherEntity = ref({});
const age = ref();
const imageList = ref();
const imageUrl = ref();
const revertBirth = ref();
const regisDate = ref();
const haveImage = ref(false);
const revert = revertBirth.value;

const student = ref({
  haveImage: haveImage.value,
  id: res.id,
  first_name: res.first_name,
  last_name: res.last_name,
  room: res.room,
  teacher_id: res.teacher_id,
  nick_name: res.nick_name,
  register_date: res.register_date,
  birth_date: "",
  gender: res.gender,
  special: res.special,
  status: res.status,
  img_file: res.img_file,
});
const res = defineProps({
  id: Number,
  first_name: String,
  last_name: String,
  room: Number,
  teacher_id: Number,
  nick_name: String,
  register_date: String,
  birth_date: String,
  gender: Number,
  special: String,
  status: Number,
  img_file: String,
  image: { thumbnail: String },
  pms: { type: Boolean, default: true },
});
onMounted(async () => {
  studentEntity.value = res;
  await fetchTeacher(studentEntity.value.teacher_id);

  convertDate();
});

const updateProcess = async () => {
  if (imageList.value) {
    if (
      studentEntity.value.img_file != "" ||
      studentEntity.value.img_file != null
    ) {
      haveImage.value = true;
    } else {
      haveImage.value = false;
    }
    student.value.img_file = await uploadImage();
  }
  student.value.haveImage = haveImage.value;
  student.value.birth_date = revertBirth.value;
  const response = await updateStudent(student.value);
  if (response) {
    console.log(response);
  }
  alertSuccess("แก้ไขข้อมูลสำเร็จจ", `แก้ไข้ข้อมูลของนักเรียนสำเร็จ`);
};
const fetchTeacher = async (id) => {
  const response = await getTeacher(id);
  // console.log(response);
  if (response && response.entity) {
    teacherEntity.value = response.entity[0];
    // console.log(teacherEntity.value);
    if (teacherEntity.value) {
      teacherName.value =
        teacherEntity.value.first_name + " " + teacherEntity.value.last_name;
    }
  }
};
const imageProcess = async (file) => {
  imageList.value = file;
  imageUrl.value = URL.createObjectURL(file);
};
const uploadImage = () => {
  return new Promise(async (resolve) => {
    let fileName = undefined;
    if (imageList.value) {
      const response = await uploadImageApi(imageList.value);
      if (response && response.imageName) {
        fileName = response.imageName;
      }
    }

    resolve(fileName);
  });
};
const revertDate = (val = "") => {
  const dd = val.substring(0, 2);
  const mm = val.substring(3, 5);
  const yy = val.substring(6, 10);
  const Ad = Number(yy) - 543;
  const result = Ad + "-" + mm + "-" + dd;
  console.log(result);

  revertBirth.value = String(result);
  const birth = String(result);
  const yearNow = new Date().getFullYear() - 1;
  const birtYear = birth.substring(0, 4);
  age.value = Number(yearNow) - Number(birtYear);
  console.log(age.value);
  if (age.value > 100 || age.value < 0) {
    age.value = "";
  }
};
const convertDate = () => {
  if (studentEntity.value.register_date) {
    regisDate.value = new Date(
      studentEntity.value.register_date
    ).toLocaleDateString();
  }
  if (studentEntity.value.birth_date) {
    let index = 4;
    const birth = new Date(studentEntity.value.birth_date);
    const dd = (birth.getDate() < 10 ? "0" : "") + birth.getDate();
    const mm =
      (birth.getMonth() < 10 ? "0" : "") + (Number(birth.getMonth()) + 1);
    const yyyy = birth.toLocaleDateString("th-TH");
    const yy = String(yyyy).substring(yyyy.length - 4);
    const full = dd + mm + yy;

    const toStr = String(full);
    birth_date.value = toStr;
  }
  const birth = String(revert);
  const yearNow = new Date().getFullYear() - 1;
  const birtYear = birth.substring(0, 4);
  console.log(revert);
  age.value = Number(yearNow) - Number(birtYear);
};
</script>

<style lang="scss" scoped></style>
