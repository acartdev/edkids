<template>
  <apexchart
    type="pie"
    width="300px"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { onMounted, ref } from "vue";
const point = ref([]);
const res = defineProps({
  point: Array,
});
onMounted(() => {
  point.value = res.point;
});
const series = ref(res.point);
const chartOptions = ref({
  chart: {
    width: 900,
    type: "pie",
  },
  labels: ["ดีมาก", "ดี", "ดื้อ"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "right",
        },
      },
    },
  ],
});

// console.log("testttttttttttjlkasdjfk;jalsdjfkj ", ref.point);
</script>

<style lang="scss" scoped></style>
