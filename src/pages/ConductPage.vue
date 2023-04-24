<template>
  <q-page class="fit">
    <div class="row fit justify-center">
      <div class="col-11 bg-white" style="border-radius: 16px; height: 620px">
        <div class="flex fit items-start justify-center">
          <div class="fit q-pa-md">
            <q-spinner
              v-if="loading == true"
              color="secondary"
              class="absolute-center"
              size="3em"
            />

            <q-markup-table
              class="q-pa-md bg-green-11"
              style="
                display: block;
                height: calc(98vh - 118px);
                /overflow-y: scroll;
              "
            >
              <thead class="bg-green-13">
                <tr>
                  <th
                    class="text-center"
                    style="font-size: 16px; font-weight: 600"
                    v-for="items in title"
                    :key="items"
                  >
                    {{ items }}
                  </th>
                </tr>
              </thead>
              <tbody
                @scroll="handleScroll"
                style="overflow-y: scroll; height: 150px"
              >
                <conductList
                  v-for="item in entityItem"
                  :key="item"
                  v-bind="item"
                />
              </tbody>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template>
            </q-markup-table>

            <div
              class="text-red text-h5 text-center absolute-center"
              style="transform: translateY(-25%); transform: translateX(-50%)"
              v-if="entityItem == 0"
            >
              ไม่มีข้อมูลคะแนนความประพฤติในขณะนี้
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineAsyncComponent } from "vue";
import { ConductApi } from "src/api/ConductApi";
import { useRoute } from "vue-router";
import { studentKey } from "src/boot/utils/config";

const { getConductList } = ConductApi();

const route = useRoute();
const id = localStorage.getItem(studentKey);
const studentId = ref(id);
const entityItem = ref({});
const loading = ref(false);

onMounted(() => {
  if (route.params.studentId) {
    studentId.value = route.params.studentId;
  }
  if (studentId.value) {
    fetchData();
  }
});

const fetchData = async () => {
  loading.value = true;
  const respone = await getConductList(studentId.value);
  loading.value = false;

  if (respone) {
    entityItem.value = respone.entity;
  }
};

const title = ref([
  "วันที่",
  "ชื่อเล่น",
  "ชื่อ-นามสกุล",
  "ความประพฤติ",
  "หมายเหตุ",
]);

const conductList = defineAsyncComponent(() =>
  import("../components/ConductList.vue")
);
</script>

<style scoped>
* tbody > tr > td {
  padding: 25px;
  margin-bottom: 25px;
  border-spacing: 0px;
  border-collapse: collapse;
}
th {
  padding: 25px;
}
</style>
