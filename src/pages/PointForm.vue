<template>
  <q-page v-if="check"
    ><q-markup-table
      ><thead>
        <tr>
          <td class="text-center">เลขที่</td>
          <td class="text-center">รูปภาพ</td>
          <td class="text-center">ชื่อเล่น</td>
          <td class="text-center">ชื่อจริง-นามสกุล</td>
          <td class="text-center">ความประพฤติ</td>
          <td class="text-center">หมายเหตุ</td>
          <td class="text-center">ส่งคะแนน</td>
        </tr>
      </thead>
      <tbody>
        <FormPoint v-for="items in data" :key="items" v-bind="items" />
      </tbody>
    </q-markup-table>
  </q-page>
  <p v-else class="text-center text-h6 q-pt-md">ไม่พบข้อมูลนักเรียน</p>
</template>

<script setup>
import FormPoint from "src/components/FormPoint.vue";
import { StudentApi } from "src/api/StudentApi";
import { Loading, QSpinnerGears } from "quasar";
import { ref, onMounted } from "vue";
const { getStudentList } = StudentApi();
const data = ref([]);
const check = ref();

const fetchList = async () => {
  const response = await getStudentList();

  if (response) {
    data.value = response.dataList;
    response.dataList.forEach((items) => {
      if (items.status != false || items.status != "") {
        check.value = true;
      }
    });
  }
};

onMounted(() => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  fetchList();
  Loading.hide();
});
</script>

<style lang="scss" scoped></style>
