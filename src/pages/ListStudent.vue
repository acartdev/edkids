<template>
  <q-page class="row justify-center">
    <q-list v-if="check" class="col-sm-9 q-gutter-md">
      <q-item-label header class="text-h5">รายชื่อนักเรียน</q-item-label>
      <q-spinner-audio v-if="loadding" size="300px" color="teal" />

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
    </q-list>
    <p v-else class="text-center text-h6 q-pt-lg">ไม่พบข้อมูลนักเรียน</p>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { StudentApi } from "src/api/StudentApi";
import ListStudents from "src/components/ListStudents.vue";

const { getStudentList } = StudentApi();
const check = ref();
const currentPage = ref(1);
const data = ref([]);
const recordPerPage = ref(5);
const loadding = ref(false);
const getvar = (value) => {
  data.value.splice(value, 1);
};

const fetchList = async () => {
  loadding.value = true;
  const response = await getStudentList({
    page: currentPage.value,
    perPage: recordPerPage.value,
  });
  if (response) {
    data.value = response.dataList;
    response.dataList.forEach((items) => {
      if (items.status != false || items.status != "") {
        check.value = true;
      }
    });
  }
  loadding.value = false;
};
onMounted(() => {
  fetchList();
});
</script>

<style lang="scss" scoped></style>
