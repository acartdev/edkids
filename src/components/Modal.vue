<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-md q-gutter-sm fit">
    <div class="row justify-center items-center">
      <div class="col-sm-8"><p class="text-h5">โพสต์รายงานกิจจกรรม</p></div>
      <div class="col-sm-3 text-right">
        <q-btn
          rounded
          color="teal"
          label="เพิ่มโพสต์"
          @click="pops = !pops"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model.prevent="pops" persistent>
      <q-card style="min-width: 500px">
        <q-form @submit.prevent="postData">
          <q-card-section>
            <div class="text-h6">เพิ่มโพสต์</div>
          </q-card-section>

          <q-card-section @keyup.enter="pops = false" class="q-pt-none">
            <div class="row q-py-md items-center justify-start">
              <div class="col-sm-12">
                <q-input
                  outlined
                  color="teal"
                  label="คำอธิบาย"
                  v-model="msg"
                  :rules="[(val) => !!val || 'กรุณาอธิบายหรือรายงาน']"
                ></q-input>
              </div>
              <div class="col-sm-12">
                <div
                  class="row q-my-xs q-pa-sm bg-teal items-center justify-between"
                >
                  <div class="col-sm-3 text-white">อัพโหลดรูปภาพ</div>
                  <div class="col-sm-1">
                    <q-file
                      borderless=""
                      dense
                      multiple
                      @update:model-value="imageFile"
                    >
                      <slot
                        ><q-icon
                          class="text-center text-h4 text-white q-pt-xs"
                          name="image"
                        ></q-icon
                      ></slot>
                    </q-file>
                  </div>
                </div>
              </div>

              <div class="col-sm-12">
                <q-list class="shadow-2">
                  <q-scroll-area class="" style="height: 300px">
                    <q-item v-for="(index, items) in imageData" :key="items">
                      <q-item-section>
                        {{ index.name }}
                      </q-item-section>
                      <q-item-section>
                        <q-img
                          class="q-mx-auto"
                          style="max-height: 150px; max-width: 130px"
                          :src="index.img"
                        ></q-img>
                      </q-item-section>
                      <q-item-section side="">
                        <q-btn
                          dense=""
                          flat=""
                          @click="imageData.splice(index, 1)"
                          icon="delete"
                        ></q-btn>
                      </q-item-section>
                    </q-item>
                  </q-scroll-area>
                </q-list>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="ยกเลิก" class="text-warning" v-close-popup />
            <q-btn flat label="โพสต์" class="text-teal" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FileApi } from "src/api/FileApi";
import { PostImageApi } from "src/api/PostImage";
import { Loading, QSpinnerGears } from "quasar";
import { alertShow } from "src/composable/alertShow";
const { alertSuccess } = alertShow();
const { PostImage, PostMsg } = PostImageApi();
const { uploadImageApi } = FileApi();
const msg = ref("");
const props = defineProps(["prompt"]);

const pops = ref(false);
const imageData = ref([]);
const imageList = ref([]);
const imageFile = (file = []) => {
  for (let i = 0; i < file.length; i++) {
    imageList.value.push(file[i]);
    imageData.value.push({
      name: file[i].name,
      img: URL.createObjectURL(file[i]),
    });
  }
};
const postData = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const postMsg = await uploadMsg();

  const data = await uploadImage();
  for (let img of data) {
    const postData = await PostImage({
      img_name: img,
      postId: postMsg,
    });
    console.log(postData);
  }
  Loading.hide();
  pops.value = false;

  await alertSuccess("อัพโหลดสำเร็จ", "คุณได้โพสต์รายงานหรือกิจกรรมสำเร็จ");
  location.reload();
};
const uploadMsg = async () => {
  return new Promise(async (resolve) => {
    const entity = [];

    if (msg.value) {
      const response = await PostMsg({
        msg: msg.value,
        create_by: 1,
      });
      if (response) {
        entity.push(response.entity);
      }
      for (let id of entity) {
        // lasrId = id.id;
        const lastId = id.id;
        resolve(lastId);
      }
    }
  });
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
</script>

<style lang="scss" scoped></style>
