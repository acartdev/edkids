<template>
  <q-dialog v-model="shows.show">
    <q-card
      style="width: 700px; height: 600px; max-height: 600px"
      class="q-pa-sm"
    >
      <q-card-section class="text-h6 no-padding"> แก้ไขโพสต์ </q-card-section>

      <q-card-section class="flex justfy-between items-center"
        ><q-input
          label="คำอธิบายโพสต์"
          v-model="postData.msg"
          dense=""
        ></q-input>
        <q-file borderless="" dense="" style="width: 70px"
          ><slot><q-icon name="add" color="teal" size="30px"></q-icon></slot
        ></q-file>
      </q-card-section>

      <q-card-section>
        <div class="row" style="height: 400px; max-height: 400px">
          <q-responsive :ratio="14 / 14" class="col">
            <q-scroll-area style="height: 190px; max-width: 300px">
              <template v-for="(img, index) in image" :key="index">
                <q-btn
                  icon="close "
                  flat=""
                  dense=""
                  @click="deleteImgProcess(index, img.id)"
                ></q-btn>
                <q-img class="relative-position" :src="img.image.thumbnail">
                </q-img>
              </template>
            </q-scroll-area>
          </q-responsive>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="cursor-pointer"
          label="ยกเลิก"
          @click="$emit('close')"
        ></q-btn>
        <q-btn label="แก้ไข" @click="updateProcess()"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { alertShow } from "src/composable/alertShow";
import { LocalStorage, Loading, QSpinnerGears } from "quasar";
import { teacherKey } from "src/boot/utils/config";
import { PostImageApi } from "src/api/PostImage";
const { ListPostImg, updatePost, deleteImg } = PostImageApi();
const { alertSuccess } = alertShow();
const shows = ref(res);
const postData = ref({});
const update_by = LocalStorage.getItem(teacherKey);
const image = ref([]);

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
    msg: postData.value.msg,
    update_by: update_by,
  });
  Loading.hide();
  console.log(response);
  if (response) {
    alertSuccess(
      "อัพเดตโพสต์สำเร็จ",
      "ท่านได้ทำการอัพเดตโพสเรียนร้อยแล้วกรุณาตรวจสอบโพสต์"
    );
  }
};
const deleteImgProcess = async (index, id) => {
  const response = await deleteImg(id);
  if (response) {
    image.value.splice(index, 1);
    console.log(index, id, response);
  }
};
onMounted(() => {
  ListImage();
  postData.value = res.data;
  // console.log(postData.value);
});
</script>

<style lang="scss" scoped></style>
