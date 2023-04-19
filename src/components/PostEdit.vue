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
      <q-card-section class="" style="height: 420px">
        <div class="row" v-if="image.length == 1">
          <q-responsive :ratio="15 / 12" class="col">
            <q-img :src="image[0].image.thumbnail"></q-img>
          </q-responsive>
        </div>
        <div class="row" v-if="image.length == 2">
          <q-responsive :ratio="8 / 12" class="col">
            <q-img :src="image[0].image.thumbnail"></q-img>
          </q-responsive>
          <q-responsive :ratio="8 / 12" class="col">
            <q-img :src="image[1].image.thumbnail"></q-img>
          </q-responsive>
        </div>
        <div class="row" v-if="image.length == 3">
          <q-responsive :ratio="14 / 12" class="col">
            <q-img class="col" :src="image[0].image.thumbnail" />
          </q-responsive>
          <div class="col-sm-5">
            <div class="row">
              <q-responsive :ratio="14 / 12" class="col">
                <q-img class="col" :src="image[1].image.thumbnail" />
              </q-responsive>
            </div>
            <q-responsive :ratio="14 / 12" class="col">
              <q-img class="col" :src="image[2].image.thumbnail" />
            </q-responsive>
          </div>
        </div>

        <div class="row" v-if="image.length == 4">
          <div class="col-sm-6">
            <q-responsive :ratio="14 / 11" class="col">
              <q-img :src="image[0].image.thumbnail"></q-img>
            </q-responsive>
            <q-responsive :ratio="14 / 11" class="col">
              <q-img :src="image[1].image.thumbnail"></q-img>
            </q-responsive>
          </div>
          <div class="col-sm-6">
            <q-responsive :ratio="14 / 11" class="col">
              <q-img :src="image[2].image.thumbnail"></q-img>
            </q-responsive>
            <q-responsive :ratio="14 / 11" class="col">
              <q-img :src="image[3].image.thumbnail"></q-img>
            </q-responsive>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn label="ยกเลิก" @click="$emit('close')"></q-btn>
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
const { ListPostImg, updatePost } = PostImageApi();
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
    console.log(image.value);
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
onMounted(() => {
  ListImage();
  postData.value = res.data;
  // console.log(postData.value);
});
</script>

<style lang="scss" scoped>
.row {
  max-height: 500px;
}
</style>
