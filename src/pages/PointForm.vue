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
        <FormPoint
          v-for="(items, index) in data"
          :key="index"
          v-bind="items"
          :index="index"
          @hide="hide"
        />
      </tbody>
    </q-markup-table>
  </q-page>
  <p v-else class="text-center text-h6 q-pt-md">ไม่พบข้อมูลนักเรียน</p>
</template>

<script setup>
import FormPoint from "src/components/FormPoint.vue";
import { StudentApi } from "src/api/StudentApi";
import { teacherKey } from "src/boot/utils/config";
import { Loading, QSpinnerGears, useMeta } from "quasar";
import { LocalStorage } from "quasar";
import { useAuthenStore } from "src/stores/authen";
import { ref, onMounted } from "vue";
useMeta({ title: "ให้คะแนน" });

const authenStore = useAuthenStore();
const { getStudentList } = StudentApi();
const data = ref([]);
const check = ref();
const id = LocalStorage.getItem(teacherKey);
const hide = (val) => {
  data.value.splice(val, 1);
};
const fetchList = async () => {
  const response = await getStudentList({
    id: id,
  });

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
