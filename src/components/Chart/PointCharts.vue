<template>
  <div class="fit">
    <apexchart
      type="donut"
      height="300px"
      :options="set.options"
      :series="set.series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref } from "vue";
const data = defineProps({
  good: {
    type: Number,
  },
  nomal: {
    type: Number,
  },
});
const set = ref({
  options: {
    legend: {
      fontSize: "18px",
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: "40%",
        },
      },
    },

    colors: ["#60f4a0", "#1e293b"],
    labels: ["นักเรียนดีเด่น", "นักเรียนทั่วไป"],
  },
  series: [29, 23],
});
</script>

<style lang="scss" scoped></style>
