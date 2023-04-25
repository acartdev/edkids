<template>
  <q-page class="bg-grey-2">
    <div class="flex q-pt-md">
      <p class="text-h4 fit text-center bg-white shadow-1 q-pa-md">
        ข้อมูลสถิติการสมัครเรียน และ นักเรียนที่เกณฑ์ดี
      </p>
    </div>

    <div class="row bg-grey-2 q-gutter-md justify-around fit q-pa-xl">
      <div class="col-sm-6 bg-white q-pa-sm shadow-18">
        <div v-if="loadding" class="fit flex flex-center">
          <q-spinner-pie size="300px" color="green-13" />
        </div>
        <chartYears v-else :years="years" :amount="amount" />
      </div>
      <div class="col-sm-5 col-12 bg-white q-pt-lg shadow-20">
        <div v-if="loadding" class="fit flex flex-center">
          <q-spinner-pie size="300px" color="green-13" />
        </div>
        <chartPoint v-else />
      </div>
    </div>

    <div class="row fit justify-center items-center q-pb-lg">
      <div
        class="col-sm-11 col-11 bg-white self-strech q-pa-md shadow-12"
        style="min-height: 560px"
      >
        <div class="flex items-center column">
          <p class="text-h5">Top5 นักเรียนที่เกณฑ์ดี</p>
          <div class="contain fit">
            <q-markup-table v-if="check" class="shadow-4">
              <thead>
                <tr class="">
                  <th class="text-center">
                    <span class="text-h6">เลขที่</span>
                  </th>
                  <th class="text-center">
                    <span class="text-h6">รูปภาพ</span>
                  </th>
                  <th class="text-center">
                    <span class="text-h6">ชื่อจริง</span>
                  </th>
                  <th class="text-center">
                    <span class="text-h6">ชื่อเล่น</span>
                  </th>
                  <th class="text-center">
                    <span class="text-h6">จำนวนคะแนน</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <StudentGrad
                  v-for="items in data"
                  :key="items"
                  v-bind="items"
                />
              </tbody>
            </q-markup-table>
            <p v-else class="text-center text-h6">ยังไม่มีการให้คะแนน</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import StudentGrad from "src/components/StudentGrad.vue";
import { StudentApi } from "src/api/StudentApi";
import { Loading, QSpinnerGears, useMeta } from "quasar";
useMeta({ title: "หน้าแรก" });
const { listPoint, listYears } = StudentApi();
const data = ref([]);
const check = ref();
const years = ref([]);
const amount = ref([]);
const loadding = ref(false);

const ListYears = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });

  const response = await listYears();
  if (response) {
    response.data.forEach((items) => {
      years.value.push(items.years);
      amount.value.push(items.amount);
    });
  }
  Loading.hide();
};
const chartYears = defineAsyncComponent(() =>
  import("components/Chart/YearCharts.vue")
);
const chartPoint = defineAsyncComponent(() =>
  import("components/Chart/PointCharts.vue")
);
const fetchList = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });

  loadding.value = true;
  const response = await listPoint();
  if (response) {
    data.value = response.data;
    // console.log(data.value);
    data.value.forEach((items) => {
      if (items.status != false || items.status != "") {
        check.value = true;
      }
    });
  }
  Loading.hide();
  loadding.value = false;
};
onMounted(() => {
  ListYears();
  fetchList();
});
</script>
<style scoped>
.row > div {
  height: 330px;
  border-radius: 30px;
}
</style>
