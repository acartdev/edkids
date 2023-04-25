<template>
  <q-page class="row justify-center">
    <q-list v-if="data != ''" class="col-sm-9 q-gutter-md">
      <q-item-label header class="text-h5 q-mt-md"
        >ราชื่อนักเรียนที่ไม่อยู่ในระบบ</q-item-label
      >

      <StudentKeep v-for="items in data" :key="items" v-bind="items" />
    </q-list>
    <p v-else class="text-center text-h6 q-pt-md">ไม่พบข้อมูลนักเรียน</p>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { StudentApi } from "src/api/StudentApi";
import { Loading, QSpinnerGears, useMeta } from "quasar";
import StudentKeep from "src/components/StudentKeep.vue";
import { useAuthenStore } from "src/stores/authen";
useMeta({ title: "รายชื่อที่ถูกจัดเก็บ" });
const authenStore = useAuthenStore();
const { getStudentList } = StudentApi();

const check = ref(true);
const data = ref([]);
const fetchList = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await getStudentList({
    id: Number(authenStore.auth),
  });
  Loading.hide();
  if (response) {
    response.dataList.forEach((element) => {
      // console.log(element.status);
      if (element.status == false) {
        data.value.push(element);
        console.log(data.value);
      }
    });
    console.log(data.value);
  }
};
onMounted(() => {
  fetchList();
});
</script>

<style lang="scss" scoped></style>
