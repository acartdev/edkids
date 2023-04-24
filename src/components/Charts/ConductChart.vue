<template>
  <!-- <div class="text-center" :v-if="ref.point === 0">
    ไม่มีข้อมูลคะแนนความประพฤติในขณะนี้
  </div> -->
  <apexchart
    :v-if="ref.point"
    type="pie"
    width="380"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { ref } from "vue";
// import { ConductApi } from "src/api/ConductApi";
// const { getConductAverage } = ConductApi();

// const id = 1;
// const studentId = ref(id);
// const conductEntityItem = ref(false);

// onMounted(() => {
//   if (route.params.studentId) {
//     studentId.value = route.params.studentId;
//   }
//   if (studentId.value) {
//     fetchData();
//   }
//   console.log("get studentId ", studentId.value);
// });

// const fetchData = async () => {
//   loading.value = true;
//   const respone = await getOne(studentId.value);
//   const response = await getParents(studentId.value);
//   const conductRestponse = await getConductAverage(studentId.value);
//   loading.value = false;
//   if (respone) {
//     entityItem.value = respone.entity;
//   }
//   if (response) {
//     parentEntityItem.value = response.entity;
//   }
//   if (conductRestponse) {
//     conductEntityItem.value = conductRestponse.value;
//   }
//   console.log(entityItem.value);
//   console.log(parentEntityItem.value);
//   // return entityItem.value;

const res = defineProps({
  point: Array,
});
const series = ref(res.point);
const chartOptions = ref({
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["ดีมาก", "ดี", "ดื้อ"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

// console.log("testttttttttttjlkasdjfk;jalsdjfkj ", ref.point);
</script>

<style lang="scss" scoped></style>
