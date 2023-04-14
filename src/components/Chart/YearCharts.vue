<!-- eslint-disable vue/valid-template-root -->
<template>
  <apexchart
    v-if="res != ''"
    type="bar"
    height="300"
    :options="data.options"
    :series="data.series"
  ></apexchart>
  <div v-else class="fit flex flex-center">
    <p class="text-center text-h6">ไม่พบข้อมูลสถิติการสมัครเรียน</p>
    <q-spinner-ball class="q-pb-lg" color="teal" size="3rem" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const res = ref([response.years]);
const response = defineProps({
  years: {
    type: Number,
    default: ref([0]),
  },
  amount: {
    type: Number,
    default: ref([0]),
  },
});

const data = ref({
  options: {
    colors: ["#60f4a0"],
    chart: {
      id: "vuechart-example",
    },
    xaxis: {
      categories: response.years,
    },
  },
  series: [
    {
      name: "series-1",
      data: response.amount,
    },
  ],
});
</script>
