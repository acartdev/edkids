<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-dialog v-model="pop.show" persistent>
    <q-card class="q-pa-sm" style="min-width: 700px">
      <q-card-section>
        <div class="text-h6">ข้อมูลผู้ปกครอง</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="height: 290px; width: 100%">
        <div class="row fit justify-between q-gutter-sm">
          <div class="col-sm-5 flex flex-center relative-position">
            <q-file
              @update:model-value="imageFile"
              dense=""
              borderless=""
              class="absolute-top-right q-mr-xl q-mt-md"
              style="z-index: 10"
              ><slot
                ><q-icon size="25px" color="teal" name="edit"></q-icon></slot
            ></q-file>
            <q-img
              :src="imgUrl ? imgUrl : res.image.thumbnail"
              style="
                object-fit: cover;
                object-position: center;
                max-height: 260px;
                max-width: 180px;
              "
            ></q-img>

            <!-- <div class="">
            </div> -->
          </div>
          <div class="col-sm-6">
            <div class="row items-center justify-between fit">
              <div class="col-sm-5">
                <q-input
                  v-model="first_name"
                  dense
                  clearable
                  label="ชื่อจริง"
                  color="teal"
                />
              </div>
              <div class="col-sm-6">
                <q-input
                  v-model="last_name"
                  dense
                  clearable
                  label="นามสกุล"
                  color="teal"
                />
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="nick_name"
                  clearable
                  label="ชื่อเล่น "
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-6">
                <q-input
                  v-model="phone"
                  clearable
                  label="เบอร์โทร"
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-7">
                <q-input
                  v-model="email"
                  clearable
                  label="Email:"
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-4">
                <q-input
                  v-model="ocupation"
                  clearable
                  label="อาชีพ"
                  dense
                  color="teal"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="negative" flat label="ยกเลิก" @click="$emit('close')" />
        <q-btn
          color="warning"
          flat
          label="แก้ไขข้อมูล"
          @click="updateProcess(), $emit('close')"
        />
        <q-btn color="teal" flat label="ตกลง" @click="$emit('close')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { ParentApi } from "src/api/ParentApi";
import { alertShow } from "src/composable/alertShow";
import { FileApi } from "src/api/FileApi";
const { uploadImageApi } = FileApi();
const { alertSuccess } = alertShow();

const { getParentList, updateParent } = ParentApi();
const pop = ref(res);
const data = ref([]);
const haveImage = ref(false);

const first_name = ref(res.first_name);
const last_name = ref(res.last_name);
const nick_name = ref(res.nick_name);
const birth_date = ref(res.birth_date);
const phone = ref(res.phone);
const zip_code = ref(res.zip_code);
const email = ref(res.email);
const ocupation = ref(res.ocupation);
const img_file = ref(res.img_file);
const editImage = ref();
const imgUrl = ref();
const close = defineEmits("close");
const imageSend = ref();

const imageFile = (val) => {
  imgUrl.value = URL.createObjectURL(val);
  imageSend.value = val;
};
const res = defineProps({
  id: { type: Number },
  first_name: { type: String },
  last_name: { type: String },
  nick_name: { type: String },
  birth_date: {},
  phone: { type: String },
  zip_code: { type: String },
  email: { type: String },
  ocupation: { type: String },
  img_file: { type: String },
  image: { thumbnail: {} },
  show: {
    default: false,
    type: Boolean,
  },
  special: { type: String },
});
onMounted(() => {
  // console.log(res);
});
const updateProcess = async () => {
  if (!first_name.value) {
    first_name.value = res.first_name;
  } else if (!last_name.value) {
    last_name.value = res.last_name;
  } else if (!nick_name.value) {
    nick_name.value = res.nick_name;
  } else if (!birth_date.value) {
    birth_date.value = res.birth_date;
  } else if (!email.value) {
    email.value = res.birth_date;
  } else if (!ocupation.value) {
    ocupation.value = res.birth_date;
  } else if (!zip_code.value) {
    zip_code.value = res.birth_date;
  } else if (!phone.value) {
    phone.value = res.birth_date;
  }

  if (imageSend.value) {
    const fileNameResponse = await uploadImageApi(imageSend.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      editImage.value = fileNameResponse.imageName;
    }
  }
  if (res.img_file != "" || res.img_file || res.img_file == null) {
    haveImage.value = true;
  }
  const response = await updateParent({
    haveImage: haveImage.value,
    id: res.id,
    first_name: first_name.value,
    last_name: last_name.value,
    nick_name: nick_name.value,
    birth_date: birth_date.value,
    phone: phone.value,
    zip_code: zip_code.value,
    email: email.value,
    ocupation: ocupation.value,
    img_file: editImage.value,
  });
  console.log(response);
  if (response) {
    await alertSuccess(
      "อัพเดตข้อมูลสำเร็จ",
      `คุณได้อัพเดตข้อมูลผู้ปกครองของนักเรียนรหัส ${res.special} แล้ว`
    );
    close("close");
    location.reload();
  }
};
</script>

<style lang="scss" scoped></style>
