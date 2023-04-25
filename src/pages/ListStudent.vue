<template>
  <q-page class="row justify-center">
    <q-list v-if="check" class="col-sm-9 col-12 q-gutter-md">
      <template class="flex justify-between">
        <q-item-label header class="text-h5">รายชื่อนักเรียน</q-item-label>
        <q-input
          v-model="search"
          @focus="listAll()"
          @blur="defaultPage"
          placeholder="กรอกรหัสนักเรียน หรือ ชื่อ"
          color="teal"
          label="ค้นหา"
          ><template v-slot:append
            ><q-btn
              @click="(search = ''), (currentPage = 1), (recordPerPage = 4)"
              :icon="search.length > 0 ? 'close' : 'search'"
              flat=""
              dense=""
            >
            </q-btn></template
        ></q-input>
      </template>

      <ListStudents
        v-for="(items, index) in searchList"
        :key="index"
        v-bind="items"
        :index="index"
        @index="getvar(index)"
        :search="search"
      />

      <!-- <q-item-section  class="text-h6 text-center">
        ไม่พบข้อมูลนักเรียน
      </q-item-section> -->

      <q-pagination
        v-if="currentPage != 0"
        v-model="currentPage"
        :max="totalPage"
        direction-links
        flat
        color="teal"
        active-color="teal"
        style="position: absolute; bottom: 7%; right: 20%"
      />
    </q-list>

    <p v-else class="text-center text-h6 q-pt-lg">ไม่พบข้อมูลนักเรียน</p>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, onUpdated } from "vue";
import { StudentApi } from "src/api/StudentApi";
import ListStudents from "src/components/ListStudents.vue";
import { LocalStorage } from "quasar";
import { Loading, QSpinnerGears, useMeta } from "quasar";
import { computed } from "vue";
import { teacherKey } from "src/boot/utils/config";
useMeta({ title: "รายชื่อนักเรียน" });
const { getStudentList } = StudentApi();
const check = ref();
const search = ref("");
const forSearch = ref([]);
const currentPage = ref(1);
const data = ref([]);
const id = LocalStorage.getItem(teacherKey);
const recordPerPage = ref(4);
const totalPage = ref(0);
const listAll = () => {
  currentPage.value = 0;
  recordPerPage.value = 0;
};
const defaultPage = () => {
  setTimeout(() => {
    currentPage.value = 1;
    recordPerPage.value = 4;
  }, 300);
};
const getvar = (value) => {
  data.value.splice(value, 1);
};

const fetchList = async () => {
  Loading.show({
    spinner: QSpinnerGears,
  });
  const response = await getStudentList({
    id: id,
    page: currentPage.value,
    perPage: recordPerPage.value,
  });

  Loading.hide();
  if (response) {
    data.value = response.dataList;
    totalPage.value = response.appPagination;
    response.dataList.forEach((items) => {
      forSearch.value.push(items);

      if (items.status != false || items.status != "") {
        check.value = true;
      }
    });
  }
};
onMounted(() => {
  fetchList();
});
const searchList = computed(() => {
  return data.value.filter((user) => {
    return (
      user.special.match(search.value) ||
      user.first_name.match(search.value) ||
      user.last_name.match(search.value) ||
      user.nick_name.match(search.value)
    );
  });
});

watch(currentPage, async (newVal, oldVal) => {
  fetchList();
});
</script>

<style lang="scss" scoped></style>
