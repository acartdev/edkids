<template>
  <q-page class="q-mb-xl">
    <div class="row fit justify-center">
      <div class="col-12 col-sm-12">
        <q-markup-table
          v-if="entityItem.length > 0"
          separator="cell"
          dense
          fullscreen
          wrap-cells
          class="fit"
        >
          <thead>
            <tr class="">
              <th class="text-left">วันที่</th>
              <th class="text-left">ชื่อ-นามสกุล</th>
              <th class="text-left gt-xs">ชื่อเล่น</th>
              <th class="text-center">ความประพฤติ</th>
              <th class="text-center">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody class="bg-grey-12 no-padding">
            <conductList v-for="item in entityItem" :key="item" v-bind="item" />
          </tbody>
        </q-markup-table>
        <p v-else class="text-center q-pt-lg text-h6">ไม่พบข้อมูบการให้คะแนน</p>
      </div>
    </div>

    <div class="text-red text-h5 text-center" v-if="entityItem.length < 0">
      ไม่มีข้อมูลคะแนนความประพฤติในขณะนี้
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { ConductApi } from "src/api/ConductApi";
import { useRoute } from "vue-router";
import { useMeta } from "quasar";
import { studentKey } from "src/boot/utils/config";
useMeta({ title: "คะแนนความประพฤติ" });
const { getConductList } = ConductApi();

const route = useRoute();
const id = localStorage.getItem(studentKey);
const studentId = ref(id);
const entityItem = ref([]);
const loading = ref(false);

onMounted(() => {
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

const title = ref(["วันที่", "ชื่อ-นามสกุล", "ความประพฤติ", "หมายเหตุ"]);

const conductList = defineAsyncComponent(() =>
  import("../../components/ConductList.vue")
);
</script>

<style scoped lang="scss">
body.screen--md {
  .q-page {
    margin: 0;
  }
}
</style>
