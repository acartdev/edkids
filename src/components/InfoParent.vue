<template>
  <q-card flat="" class="" style="border-bottom: 1px dashed black">
    <q-form @submit="updateProcess">
      <q-card-section>
        <p class="text-center text-h6">ข้อมูลผู้ปกครอง</p>
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
              :src="imageUrl ? imageUrl : parentEntity.image?.thumbnail"
              height="150px"
              width="170px"
            >
            </q-img>
          </div>
          <div class="col-sm-8">
            <div class="row justify-around">
              <div class="col-sm-5">
                <q-input
                  v-model="parent.first_name"
                  :readonly="parentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">ชื่อจริง</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="parent.last_name"
                  :readonly="parentEntity.pms"
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
                  v-model="parent.nick_name"
                  :readonly="parentEntity.pms"
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
                  :readonly="parentEntity.pms"
                  @update:model-value="revertDate"
                  dense=""
                  :mask="mask"
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
                    <p class="text-caption text-center q-pt-md q-mr-xl">ปี</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  class=""
                  :readonly="true"
                  v-model="parentEntity.amouts"
                  v-if="parentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">
                      มีนักเรียนทั้งหมด
                    </p>
                  </template>
                  <template v-slot:after>
                    <p class="text-caption text-center q-pt-md">คน</p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl">
              <div class="col-sm-5">
                <q-input
                  v-model="parent.ocupation"
                  :readonly="parentEntity.pms"
                  class=""
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">อาชีพ</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="parent.phone"
                  :readonly="parentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">
                      เบอร์โทรศัพท์
                    </p>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-xl q-mb-xl">
              <div class="col-sm-5">
                <q-input
                  v-model="parent.email"
                  :readonly="parentEntity.pms"
                  class=""
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">อีเมล</p>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="parent.zip_code"
                  :readonly="parentEntity.pms"
                  dense=""
                >
                  <template v-slot:before>
                    <p class="text-caption text-center q-pt-md">รหัสไปรษณีย์</p>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="!parentEntity.pms" class="q-pr-lg" align="right">
        <q-btn color="warning" label="แก้ไข" type="submit"></q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { FileApi } from "src/api/FileApi";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ParentApi } from "src/api/ParentApi";
import { alertShow } from "src/composable/alertShow";
const { alertSuccess } = alertShow();
const { updateParent } = ParentApi();
const { uploadImageApi } = FileApi();
const parentEntity = ref({});
const mask = "##/##/####";
const imageList = ref();
const imageUrl = ref();

const birth_date = ref();
const age = ref();
const revertBirth = ref();
const revert = revertBirth.value;
const haveImage = ref(false);
const parent = ref({
  id: res.id,
  first_name: res.first_name,
  last_name: res.last_name,
  nick_name: res.nick_name,
  email: res.email,
  phone: res.phone,
  ocupation: res.ocupation,
  img_file: res.img_file,
  birth_date: "",
  haveImage: haveImage.value,
  zip_code: res.zip_code,
});

const res = defineProps({
  id: Number,
  first_name: String,
  last_name: String,
  nick_name: String,
  birth_date: String,
  phone: String,
  email: String,
  ocupation: String,
  zip_code: String,
  img_file: String,
  image: { thumbnail: String },
  amouts: Number,
  pms: { type: Boolean, default: true },
});

onMounted(async () => {
  parentEntity.value = res;
  convertDate();
});

const imageProcess = async (file) => {
  imageList.value = file;
  imageUrl.value = URL.createObjectURL(file);
  if (file) {
    haveImage.value = true;
  } else {
    haveImage.value = false;
  }
};
const revertDate = (val = "") => {
  const dd = val.substring(0, 2);
  const mm = val.substring(3, 5);
  const yy = val.substring(6, 10);
  const Ad = Number(yy) - 543;
  const result = Ad + "-" + mm + "-" + dd;

  revertBirth.value = String(result);
  const birth = String(result);
  const yearNow = new Date().getFullYear() - 1;
  const birtYear = birth.substring(0, 4);

  age.value = Number(yearNow) - Number(birtYear);
  if (age.value > 100 || age.value < 0) {
    age.value = "";
  }
};
const updateProcess = async () => {
  if (imageList.value) {
    if (
      parentEntity.value.img_file != "" ||
      parentEntity.value.img_file != null
    ) {
      haveImage.value = true;
    } else {
      haveImage.value = false;
    }
    parent.value.img_file = await uploadImage();
  }
  parent.value.birth_date = revertBirth.value;

  const response = await updateParent(parent.value);
  // if (response) {
  //   console.log(response);
  // }
  alertSuccess("แก้ไขข้อมูลสำเร็จจ", `แก้ไข้ข้อมูลผู้ปกครองของนักเรียนสำเร็จ`);
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
const convertDate = () => {
  if (parentEntity.value.birth_date) {
    const birth = new Date(parentEntity.value.birth_date);
    const dd = (birth.getDate() < 10 ? "0" : "") + birth.getDate();
    const mm =
      (birth.getMonth() < 10 ? "0" : "") + (Number(birth.getMonth()) + 1);
    const yyyy = birth.toLocaleDateString("th-TH").substring(-5);
    const yy = String(yyyy).substring(yyyy.length - 4);
    const full = dd + mm + yy;
    const toStr = String(full);
    birth_date.value = toStr;
  }
  const birth = String(revert);
  const yearNow = new Date().getFullYear() - 1;
  const birtYear = birth.substring(0, 4);

  age.value = Number(yearNow) - Number(birtYear);
};
</script>

<style lang="scss" scoped></style>
