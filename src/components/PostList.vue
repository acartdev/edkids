<template>
  <tr>
    <td class="text-left">{{ detail.index }}</td>
    <td class="text-center">
      <q-img
        v-if="postImage != ''"
        :src="postImage[0]"
        style="max-width: 130px; height: 80px"
        fit="cover"
      ></q-img>
      <p v-else>ไม่มีรูปภาพ</p>
    </td>
    <td class="text-center">{{ detail.msg }}</td>
    <td class="text-center">
      <q-btn label="แก้ไข" color="warning" outline class="q-mr-sm"></q-btn>
      <q-btn outline color="negative" label="ลบ" @click="deletePost"></q-btn>
    </td>
  </tr>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { PostImageApi } from "src/api/PostImage";
const deleted = defineEmits(["deleted"]);
const { ListPostImg, deleteImgPost } = PostImageApi();
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
});
onMounted(() => {
  ListImage();
});
const deletePost = async () => {
  const ftdelete = await deleteImgPost(detail.id);

  if (ftdelete) {
    deleted("deleted", detail.index, detail.id);
  }
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
