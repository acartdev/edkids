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
import { Loading, QSpinnerGears } from "quasar";
import { useQuasar } from "quasar";
const $q = useQuasar();
const { alertSuccess, alertWarning } = alertShow();
const { ListPost, deletePost, deleteImgPost } = PostImageApi();
const PostData = ref([]);
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
  const deletePostId = await deletePost(id);
  PostData.value.splice(val, 1);
  // location.reload();
};
onUpdated(async () => {
  // await Post();
});
onMounted(async () => {
  await Post();
});
const Post = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await ListPost();
  if (response && response.dataList) {
    for (let items of response.dataList) {
      PostData.value.push(items);
    }
  }
  Loading.hide();
};
</script>

<style lang="scss" scoped></style>
