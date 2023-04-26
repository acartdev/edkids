<template>
  <q-card class="q-mb-md q-mt-md">
    <q-card-section>
      <div class="flex">
        <q-avatar size="60px">
          <img
            style="object-fit: cover; object-position: center"
            :src="entityItem?.image?.thumbnail"
            alt=""
          />
        </q-avatar>

        <div class="flex column q-ml-md justify-center items-around">
          <p class="no-margin">
            {{ entityItem?.first_name + " " + entityItem?.last_name }}
          </p>
          <p class="text-grey-6">{{ post?.upload_time }}</p>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section :class="checkImage.length > 0 ? 'q-py-none' : 'q-py-md'">
      <p
        class="no-margin no-padding"
        :class="checkImage.length <= 0 ? 'text-h5' : 'text-h6'"
      >
        {{ post?.msg }}
      </p>
    </q-card-section>

    <q-card-section v-if="checkImage.length > 0">
      <q-responsive :ratio="16 / 9" style="max-width: 100%">
        <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          animated
          control-color="green-13"
          prev-icon="arrow_back_ios"
          next-icon="arrow_forward_ios"
          control-type="push"
          padding=""
          arrows
          height="400px"
          class="fit rounded-borders"
        >
          <q-carousel-slide
            class="flex-center no-warp"
            v-for="(img, index) in image"
            :key="index"
            :name="index"
            :img-src="img"
          >
          </q-carousel-slide>
        </q-carousel>
      </q-responsive>
    </q-card-section>
    <q-separator />
    <div class="row fit items-center justify-between">
      <div class="col-6">
        <q-rating
          class="q-pa-sm"
          v-model="like"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
        />
      </div>
      <div class="col-6 text-right q-px-md">
        {{ Like + like == 0 ? "ไม่มีการให้ดาว" : Like + like + " ดาว" }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { TeacherApi } from "src/api/TeacherApi";
import { PostApi } from "src/api/PostApi";
const like = ref(0);
const { getOneTeacher } = TeacherApi();
const { getImagePost, likePost, likeGet } = PostApi();
const checkImage = ref([]);
const teacherId = ref(post.create_by);
const entityItem = ref(false);
const image = ref([]);
const Like = ref(0);
const like_post = ref({
  post_id: post.id,
});
const post = defineProps({
  id: Number,
  upload_time: String,
  msg: String,
  create_by: Number,
  img_name: String,
  upload_by: Number,
  post_id: Number,
});

onMounted(() => {
  fetchData();
  listImage();
});
onUnmounted(() => {
  addLike();
});
const addLike = async () => {
  for (let i = 0; i < like.value; i++) {
    const response = await likePost(like_post.value);
  }
};
const listImage = async () => {
  const respone = await getImagePost(post.id);

  if (respone) {
    for (let i of respone.entity) {
      checkImage.value.push(i.img_name);

      image.value.push(i.image.thumbnail);
      // imageAmount.value.push(Number(image.value.length));
    }
  }
};

const fetchData = async () => {
  const response = await getOneTeacher(teacherId.value);
  const getLike = await likeGet(post.id);
  if (getLike.likePost) {
    Like.value = getLike.likePost;
  }
  if (response) {
    response.entity.forEach((element) => {
      entityItem.value = element;
    });
  }
};

const slide = ref(0);
</script>

<style scoped></style>
