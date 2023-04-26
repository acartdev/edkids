<template>
  <q-page class="q-mb-xl">
    <div class="row justify-center">
      <div class="col-11 col-sm-6">
        <!-- post reload -->

        <post v-for="item in entityItem" :key="item" v-bind="item" />

        <q-spinner
          v-if="loading == true"
          color="secondary"
          class="absolute-center"
          size="3em"
        />

        <div
          class="text-h6 text-center text-secondary absolute-center"
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
import { ref, onMounted, defineAsyncComponent } from "vue";
import { PostApi } from "src/api/PostApi";
import { teacher_id } from "src/boot/utils/config";
import { LocalStorage, useMeta } from "quasar";
useMeta({ title: "รายงานกิจกรรม" });
const { getPost } = PostApi();
const id = LocalStorage.getItem(teacher_id);
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

  loading.value = false;
};
const post = defineAsyncComponent(() =>
  import("../../components/PostRoom.vue")
);
</script>

<style scoped lang="scss">
body.screen--lg {
  .q-page {
    padding: 0;
    margin: 0;
  }
}
</style>
