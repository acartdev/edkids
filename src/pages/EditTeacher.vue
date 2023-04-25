<template>
  <q-page class="">
    <q-card v-if="show" class="absolute-center z-top" style="max-width: 600px">
      <q-card-section>
        <p class="text-h6 no-padding no-margin">แก้ไขข้อมูลครู</p>
      </q-card-section>
      <q-form>
        <q-card-section>
          <div class="row justify-around q-gutter-md">
            <div class="col-sm-5">
              <q-input dense label="ชื่อจริง" v-model="teacherData.first_name">
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input dense label="นามสกุล" v-model="teacherData.last_name">
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input dense label="ชื่อเล่น" v-model="teacherData.nick_name">
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input dense label="ตำแหน่ง" v-model="teacherData.position">
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input dense label="เบอร์โทรศัพท์" v-model="teacherData.phone">
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input
                dense
                label="ห้องที่ควบคุม"
                disable=""
                v-model="teacherData.room"
              >
                <template v-slot:before
                  ><p class="text-caption text-center q-pt-lg text-dark">
                    ห้อง
                  </p></template
                >
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-input
                dense
                label="ลิงก์ไลน์กลุ่ม"
                v-model="teacherData.link_line"
              >
              </q-input>
            </div>
            <div class="col-sm-5">
              <q-file label="รูปโปรไฟล์" dense="" v-model="imageList">
                <template v-slot:append>
                  <q-icon name="image"></q-icon>
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>
        <q-card-section align="right">
          <q-btn to="/" label="ยกเลิก"> </q-btn>
          <q-btn
            label="แก้ไข"
            @click="updateProcess()"
            color="teal"
            class="q-ml-sm"
          >
          </q-btn>
        </q-card-section>
      </q-form>
    </q-card>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="fit"
      infinite
      :autoplay="true"
      style="max-height: 87vh"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210211-205921.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210212-195024.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210214-154703.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210310-194240.jpg"></q-img>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LocalStorage, useMeta } from "quasar";
import { teacherKey } from "src/boot/utils/config";
import { teacherApi } from "src/api/Teacher";
import { alertShow } from "src/composable/alertShow";
import { FileApi } from "src/api/FileApi";
useMeta({ title: "แก้ไขข้อมูลครู" });
const show = ref(true);
const { uploadImageApi } = FileApi();
const { alertSuccess } = alertShow();
const { getTeacher, updateTeacher } = teacherApi();
const slide = ref(1);
const imageList = ref();
const teacherData = ref({});
const teacherId = LocalStorage.getItem(teacherKey);
const haveImage = ref(false);
const getInfoTeacher = async () => {
  const response = await getTeacher(teacherId);
  if (response) {
    teacherData.value = response.entity[0];
    console.log(teacherData.value);
  }
};
onMounted(async () => {
  await getInfoTeacher();
});

const updateProcess = async () => {
  if (imageList.value) {
    if (teacherData.value.img_name == "" || teacherData.value == null) {
      haveImage.value = false;
    } else {
      haveImage.value = true;
    }
    teacherData.value.haveImage = haveImage.value;
    console.log(teacherData.value);
    teacherData.value.img_name = await uploadImage();
  }
  const response = await updateTeacher(teacherData.value);
  if (response) {
    show.value = false;
    await alertSuccess(
      "แก้ไขข้อมูลครูสำเร็จ",
      "ท่านได้ทำการแก้ไขข้อมูลส่วนตัวสำเร็จ"
    );
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  }
};
const uploadImage = () => {
  return new Promise(async (resolve) => {
    if (imageList.value) {
      const response = await uploadImageApi(imageList.value);

      resolve(response.imageName);
    }
  });
};
</script>

<style lang="scss" scoped>
.q-img {
  object-fit: cover;

  position: relative;
}
.q-img::after {
  content: "";
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
