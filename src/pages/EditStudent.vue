<template>
  <q-page class="">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="fit absolute-full"
      infinite
      :autoplay="true"
      style="max-height: 100vh"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210211-205921.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210212-195024.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210214-154703.jpg"></q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-img src="src/assets/forDev/70102030_0_20210310-194240.jpg"></q-img>
      </q-carousel-slide>
    </q-carousel>
    <q-card class="absolute-center" style="width: 800px; height: 600px">
      <q-card-section>
        <q-btn
          icon="close"
          class="absolute z-top"
          flat=""
          rounded=""
          to="/list"
        ></q-btn>
      </q-card-section>
      <q-card-section class="fit" visible>
        <q-scroll-area style="height: 95%" class="">
          <info-parent
            @resive="check"
            v-for="item in parentEntity"
            :key="item"
            v-bind="item"
          />
          <info-student
            v-for="item in studentEntity"
            :key="item"
            v-bind="item"
          />
          <!-- <div v-for="item in studentEntity" :key="item">
            {{ item }}
          </div> -->
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import InfoParent from "src/components/InfoParent.vue";
import InfoStudent from "src/components/InfoStudent.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { StudentApi } from "src/api/StudentApi";
import { ParentApi } from "src/api/ParentApi";
import { ManageApi } from "src/api/ManageParent";
import { useMeta, Loading, QSpinnerGears } from "quasar";

const { getListParent } = ManageApi();
const { getParentList } = ParentApi();
const { readSingle } = StudentApi();
const router = useRoute();
const parentEntity = ref([]);
const show = ref(true);
const student = ref({});
const action = ref();
const findParentId = ref();
const getId = ref();
const amout = ref();
const slide = ref(1);
const pms = ref(false);
const studentEntity = ref({});
const check = (val = {}) => {
  for (let i = 0; i < parentEntity.value.length; i++) {
    parentEntity.value[i] = val;
    console.log(parentEntity);
  }
};
onMounted(async () => {
  if (router.params.action) {
    action.value = router.params.action;
  }
  if (router.params.id) {
    getId.value = router.params.id;
  }
  if (action.value === "list") {
    await fetchStudentOne(getId.value);
    await fetchStudent(findParentId.value);
    await fetchParent(getId.value);
  } else if (action.value === "edit") {
    await fetchParent(getId.value);
    await fetchStudentOne(getId.value);
    for (let i = 0; i < studentEntity.value.length; i++) {
      studentEntity.value[i].pms = pms.value;
    }
    for (let i = 0; i < parentEntity.value.length; i++) {
      parentEntity.value[i].pms = pms.value;
    }
    console.log(studentEntity.value);
  }
});
useMeta({
  title:
    action.value == "edit"
      ? "แก้ไขรายชื่อนักเรียน"
      : "ข้อมูลทั้งหมดของนักเรียน",
});
const fetchStudent = async (id) => {
  const response = await getListParent(id);
  if (response) {
    studentEntity.value = response.entity;
  }
};
const fetchStudentOne = async (id) => {
  const response = await readSingle(id);
  if (action.value === "edit") {
    studentEntity.value = response.entity;
  }
  if (response && response.entity) {
    student.value = response.entity;
    // console.log("asd", student.value.room);
    for (let id of student.value) {
      findParentId.value = id.parent_id;
    }
  }
};
const fetchParent = async (id) => {
  const response = await getParentList(id);
  if (response && response.entity) {
    parentEntity.value = response.entity;
    console.log("parent", response);
    amout.value = studentEntity.value.length;
    for (let i = 0; i < parentEntity.value.length; i++) {
      parentEntity.value[i].amouts = amout.value;
      console.log(parentEntity.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.q-img {
  position: relative;
  object-fit: cover;
}
</style>
