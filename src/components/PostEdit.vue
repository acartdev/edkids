<template>
  <q-dialog v-model="shows.show">
    <q-card
      style="width: 700px; height: 630px; max-height: 630px"
      class="q-pa-sm"
    >
      <q-card-section class="text-h6 no-padding">
        แก้ไขโพสต์
        <q-icon name="image"></q-icon>
      </q-card-section>

      <q-card-section class="flex justfy-between items-center"
        ><q-input label="คำอธิบายโพสต์" v-model="text" dense=""></q-input>
        <q-file
          @update:model-value="imgFile"
          borderless=""
          dense=""
          style="width: 70px"
          ><slot><q-icon name="add" color="teal" size="30px"></q-icon></slot
        ></q-file>
      </q-card-section>

      <q-card-section>
        <div class="row" style="height: 400px; max-height: 400px">
          <q-responsive :ratio="14 / 14" class="col">
            <q-scroll-area
              v-if="image != ''"
              style="height: 190px; max-width: 300px"
            >
              <template v-for="(img, index) in image" :key="index">
                <q-btn
                  icon="close "
                  flat=""
                  dense=""
                  @click="deleteImgProcess(index, img.id)"
                ></q-btn>
                <q-img :src="img.image.thumbnail"> </q-img>
              </template>
            </q-scroll-area>
            <p v-else class="text-center text-h6 q-mt-xl">ไม่มีรูปภาพ</p>
          </q-responsive>
        </div>
      </q-card-section>

      <q-card-section align="right">
        <q-btn
          class="cursor-pointer"
          label="ยกเลิก"
          @click="$emit('close'), (text = postData.msg), (imgUrl = image)"
        ></q-btn>
        <q-btn
          label="แก้ไข"
          class="q-ml-sm"
          color="warning"
          @click="updateProcess(), $emit('close')"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { alertShow } from "src/composable/alertShow";
import { LocalStorage, Loading, QSpinnerGears } from "quasar";
import { teacherKey } from "src/boot/utils/config";
import { PostImageApi } from "src/api/PostImage";
import { FileApi } from "src/api/FileApi";
const { uploadImageApi } = FileApi();
const { ListPostImg, updatePost, deleteImg, PostImage } = PostImageApi();
const { alertSuccess } = alertShow();
const shows = ref(res);
const postData = ref({});
const Authen = LocalStorage.getItem(teacherKey);
const image = ref([]);
const haveImage = ref(false);
const imgUrl = ref();
const imageList = ref([]);
const text = ref("");
const id = ref([]);
const imgFile = async (val) => {
  imgUrl.value = URL.createObjectURL(val);
  image.value.push({
    img_name: val.name,
    image: {
      path: imgUrl.value,
      thumbnail: imgUrl.value,
    },
  });
  if (val) {
    imageList.value.push(val);
    // const img = await uploadImage();
  }
};
const uploadImage = () => {
  return new Promise(async (resolve) => {
    let fileName = [];
    if (imageList.value) {
      for (let i of imageList.value) {
        const response = await uploadImageApi(i);

        if (response && response.imageName) {
          fileName.push(response.imageName);
        }
      }
    }

    resolve(fileName);
  });
};

const res = defineProps({
  show: { type: Boolean, default: false },
  data: {},
});

const ListImage = async () => {
  const response = await ListPostImg(res.data.id);
  if (response && response.entity) {
    image.value = response.entity;
    console.log("all", image.value);
  }
};
const updateProcess = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await updatePost({
    id: postData.value.id,
    msg: text.value,
    update_by: Authen,
  });
  if (response) {
    const addImg = await uploadImage();
    for (let img of addImg) {
      const moreImg = await PostImage({
        img_name: img,
        postId: postData.value.id,
      });
      console.log(moreImg);
    }
  }
  if (id.value.length > 0) {
    for (let i of id.value) {
      const deleted = await deleteImg(i);
      console.log(deleted);
    }
  }

  Loading.hide();

  if (response) {
    await alertSuccess(
      "อัพเดตโพสต์สำเร็จ",
      "ท่านได้ทำการอัพเดตโพสเรียนร้อยแล้วกรุณาตรวจสอบโพสต์"
    );
  }
  location.reload();
};
const deleteImgProcess = async (index, idDelete) => {
  // const response = await deleteImg(id);
  // if (response) {
  image.value.splice(index, 1);
  id.value.push(idDelete);
  console.log(id.value);
  //   console.log(index, id, response);
  // }
};
onMounted(() => {
  ListImage();
  postData.value = res.data;
  text.value = postData.value.msg;
});
watch(res, async (newVal, oldVal) => {
  console.log(newVal);
  ListImage();
});
</script>

<style lang="scss" scoped></style>
