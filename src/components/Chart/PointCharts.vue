<template>
  <apexchart
    type="donut"
    :options="set.options"
    :series="set.series"
  ></apexchart>
</template>

<script setup>
import { PointApi } from "src/api/PointTotal";
import { ref, onMounted } from "vue";
const point = ref([]);
onMounted(() => {
  resPoint();
});
const { PointResult } = PointApi();
const resPoint = async () => {
  const response = await PointResult();
  if (response) {
    response.all.forEach((items) => {
      point.value.push(items);
    });
    console.log(point.value);
  }
};
const set = ref({
  options: {
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
            height: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      fontSize: "18px",
    },
    plotOptions: {
      pie: {
        expandOnClick: true,

        donut: {
          size: "45",
        },
      },
    },

    colors: ["#1e293b", "#60f4a0"],
    labels: ["นักเรียนทั่วไป", "นักเรียนดีเด่น"],
  },
  series: point.value,
});
</script>

<style lang="scss" scoped></style>
