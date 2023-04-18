<template>
  <q-page class="row justify-center">
    <q-list v-if="check" class="col-sm-9 q-gutter-md">
      <q-item-label header class="text-h5">รายชื่อนักเรียน</q-item-label>

      <ListStudents
        v-for="(items, index) in data"
        :key="index"
        v-bind="items"
        :index="index"
        @index="getvar(index)"
      />

      <!-- <q-item-section  class="text-h6 text-center">
        ไม่พบข้อมูลนักเรียน
      </q-item-section> -->
      <q-pagination
        v-model="currentPage"
        :max="totalPage"
        direction-links
        flat
        color="teal"
        active-color="teal"
        style="position: absolute; bottom: 7%; right: 20%"
      />
    </q-list>

    <p v-else class="text-center text-h6 q-pt-lg">ไม่พบข้อมูลนักเรียน</p>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, onUpdated } from "vue";
import { StudentApi } from "src/api/StudentApi";
import ListStudents from "src/components/ListStudents.vue";
import { useAuthenStore } from "src/stores/authen";
import { teacherApi } from "src/api/Teacher";
import { Loading, QSpinnerGears } from "quasar";
import { AuthenApi } from "src/api/AuthenApi";
const { getTeacher } = teacherApi();
const authenStore = useAuthenStore();
const { getStudentList } = StudentApi();
const { getUserDataByAuth } = AuthenApi();
const check = ref();
const currentPage = ref(1);
const data = ref([]);
const recordPerPage = ref(5);
const totalPage = ref(0);

const getvar = (value) => {
  data.value.splice(value, 1);
};
const fetchUserData = async () => {
  if (authenStore.auth) {
    console.log("id", authenStore.auth);
  }
};
const fetchList = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await getStudentList({
    id: authenStore.auth,
    page: currentPage.value,
    perPage: recordPerPage.value,
  });

  Loading.hide();
  if (response) {
    data.value = response.dataList;
    totalPage.value = response.appPagination;
    response.dataList.forEach((items) => {
      if (items.status != false || items.status != "") {
        check.value = true;
      }
    });
  }
};
onMounted(() => {
  fetchList();
  fetchUserData();
});

watch(currentPage, async (newVal, oldVal) => {
  fetchList();
});
</script>

<style lang="scss" scoped></style>
