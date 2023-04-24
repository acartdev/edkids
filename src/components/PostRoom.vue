<template>
  <q-card class="q-a-md q-mb-md">
    <q-card-section>
      <div class="flex">
        <q-avatar size="80px">
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

    <q-card-section class="q-pa-xs">
      <p
        class="no-margin q-px-xl q-py-md"
        :class="checkImage.length <= 0 ? 'text-h5' : 'text-h6'"
      >
        {{ post?.msg }}
      </p>
    </q-card-section>

    <q-card-section>
      <q-carousel
        v-if="checkImage.length > 0"
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="teal"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="400px"
        class="fit rounded-borders"
      >
        <q-carousel-slide
          class="column fit no-wrap flex-center"
          v-for="(item, index) in image"
          :key="index"
          :name="index"
        >
          <div class="row fit">
            <q-responsive :ratio="16 / 9" class="col">
              <q-img :src="item"></q-img>
            </q-responsive>
          </div>

          <!-- <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div> -->
        </q-carousel-slide>
      </q-carousel>
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
  console.log(image.value);
});
const listImage = async () => {
  const respone = await getImagePost(post.id);
  console.log(respone);
  if (respone) {
    for (let i of respone.entity) {
      checkImage.value.push(i.img_name);
      console.log(checkImage.value);
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
const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.";
</script>

<style scoped>
.wrapper1 {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 450px;
  padding: none;
}
.wrapper2 {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 400px;
  padding: none;
}
.wrapper3 {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 300px 300px;
  padding: none;
}
.wrapper4 {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 300px 300px;
  padding: none;
}
.grid-item1 {
  grid-column: 1/3;
}
</style>
