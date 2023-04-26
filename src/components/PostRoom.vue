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
          control-color="white"
          prev-icon="arrow_back_ios"
          next-icon="arrow_forward_ios"
          arrows
          height="400px"
          class="fit rounded-borders"
        >
          <q-carousel-slide
            v-for="(img, index) in image"
            :key="index"
            :name="index"
            :img-src="img"
          />
          <!-- <q-carousel-slide
            class="column fit no-wrap flex-center"
            v-for="(item, index) in image"
            :key="index"
            :name="index"
          > -->
          <!-- <div class="row fit">

                <q-img :src="item"></q-img>

            </div> -->

          <!-- <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div> -->
          <!-- </q-carousel-slide> -->
        </q-carousel>
      </q-responsive>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TeacherApi } from "src/api/TeacherApi";
import { PostApi } from "src/api/PostApi";

// const one = ref(false);
// const two = ref(false);
// const three = ref(false);
// const four = ref(false);
// const toolbar = ref(false);

const { getOneTeacher } = TeacherApi();
const { getImagePost } = PostApi();
const checkImage = ref([]);
const post = defineProps({
  id: Number,
  upload_time: String,
  msg: String,
  create_by: Number,
  img_name: String,
  upload_by: Number,
  post_id: Number,
});

const teacherId = ref(post.create_by);
const entityItem = ref(false);
const image = ref([]);
let imageAmount = ref([]);

onMounted(() => {
  fetchData();
  listImage();
});
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

  if (response) {
    response.entity.forEach((element) => {
      entityItem.value = element;
    });
  }
};

function checkPictureAmount(imageAmount) {
  const amount = imageAmount;
  return amount;
}

const slide = ref(0);
</script>

<style scoped></style>
