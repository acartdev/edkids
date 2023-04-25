<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="q-pa-md">
    <Modal></Modal>
    <q-markup-table v-if="PostData != ''">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-center">รูปภาพ</th>
          <th class="text-center">คำอธิบาย</th>
          <th class="text-center">เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <PostList
          v-for="(items, index) in PostData"
          :key="index"
          v-bind="items"
          :index="index"
          @deleted="confirm"
        />
      </tbody>
    </q-markup-table>
    <p v-else class="text-center text-h6">ไม่พบการรายงานหรือกิจจกรรม</p>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import Modal from "src/components/Modal.vue";
import PostList from "src/components/PostList.vue";
import { PostImageApi } from "src/api/PostImage";
import { alertShow } from "src/composable/alertShow";
import { Loading, QSpinnerGears, useMeta } from "quasar";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
useMeta({ title: "โพสต์กิจจกรรม" });

const $q = useQuasar();
const router = useRouter();
const { alertSuccess, alertWarning } = alertShow();
const { ListPost, deletePost, deleteImgPost, ListPostImg } = PostImageApi();
const PostData = ref([]);
const imageData = ref([]);
const confirm = (val, id) => {
  $q.dialog({
    title: "ยืนยันการลบ?",
    message: "คุณต้องการลบโพสต์นี้หรือไม่",
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
      await deletePosts(val, id);

      await alertSuccess("ลบโพสต์สำเร็จ", "คุณได้ทำการลบโพสสำเร็จแล้ว");
    })

    .onCancel(() => {
      alertWarning();
    });
};

const deletePosts = async (val, id) => {
  console.log(val, id);
  await deleteImgPost(id);
  await deletePost(id);
  PostData.value.splice(val, 1);
};
onMounted(async () => {
  await Post();
});
const Post = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await ListPost();
  if (response && response.dataList) {
    PostData.value = response.dataList;
    // for (let i of PostData.value) {
    //   const resImage = await ListPostImg(i.id);
    //   imageData.value = resImage.entity;
    // }
    // if (imageData.value) {
    //   for (let i of imageData.value) {
    //     // PostData.value.push({ img: {} });
    //   }
    // PostData.value = imageData.value;
    // }
  }
  Loading.hide();
};
</script>

<style lang="scss" scoped></style>
