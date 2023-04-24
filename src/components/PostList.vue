<template>
  <tr>
    <td class="text-left">{{ detail.index }}</td>
    <td class="text-center">
      <q-img
        v-if="postImage.length > 0"
        :src="postImage[0]"
        style="max-width: 130px; height: 80px"
        fit="cover"
      >
      </q-img>
      <p v-else>ไม่มีรูปภาพ</p>
    </td>
    <td class="text-center">{{ detail.msg }}</td>
    <td class="text-center">
      <q-btn
        label="แก้ไข"
        color="warning"
        @click="shows = !shows"
        outline
        class="q-mr-sm"
      ></q-btn>
      <q-btn outline color="negative" label="ลบ" @click="deletePost"></q-btn>
    </td>
    <post-edit :data="detail" :show="shows" @close="shows = !shows"></post-edit>
  </tr>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { PostImageApi } from "src/api/PostImage";
import PostEdit from "./PostEdit.vue";
const deleted = defineEmits(["deleted"]);
const { ListPostImg, deleteImgPost } = PostImageApi();
const shows = ref(false);
const postData = ref({});
const saveData = ref([]);
const postImage = ref([]);
const detail = defineProps({
  index: Number,
  id: {
    type: Number,
  },
  upload_time: {
    type: String,
  },
  msg: {
    type: String,
  },
  create_by: {
    type: Number,
  },
  img: {},
});
onMounted(() => {
  ListImage();
  postData.value = detail;
});
const deletePost = () => {
  deleted("deleted", detail.index, detail.id);
};
const ListImage = async () => {
  const response = await ListPostImg(detail.id);
  for (let image of response.entity) {
    postImage.value.push(image.image.thumbnail);
    console.log(postImage.value);
  }
};
</script>

<style lang="scss" scoped></style>
