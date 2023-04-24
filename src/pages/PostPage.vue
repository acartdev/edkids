<template>
  <q-page class="fit">
    <div class="row justify-center" style="height: 620px">
      <div class="col-sm-10">
        <!-- post reload -->

        <div @scroll="handleScroll" style="overflow-y: scroll; height: 90vh">
          <post v-for="item in entityItem" :key="item" v-bind="item" />
        </div>

        <q-spinner
          v-if="loading == true"
          color="secondary"
          class="absolute-center"
          size="3em"
        />

        <div
          class="text-h5 text-center q-pa-xl text-secondary absolute-center"
          v-if="entityItem == ''"
          style="background-color: whitesmoke; border-radius: 4px"
        >
          ไม่มี Post ในขณะนี้
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineAsyncComponent } from "vue";
import { SocialApi } from "src/api/SocialApi";
import { useRoute } from "vue-router";
import { PostApi } from "src/api/PostApi";
import { teacherKey } from "src/boot/utils/config";

const route = { useRoute };
const { getPost } = PostApi();
const { getImagePost } = PostApi();

const id = localStorage.getItem(teacherKey);
const teacherId = ref(id);
const entityItem = ref(false);
const imageId = ref([]);
const imageEntity = ref([]);
const loading = ref(false);

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  loading.value = true;
  const response = await getPost(teacherId.value);

  if (response) {
    entityItem.value = response.dataList;
  }
  console.log(entityItem.value);

  loading.value = false;
};

const post = defineAsyncComponent(() => import("../components/PostRoom.vue"));
</script>

<style scoped></style>
